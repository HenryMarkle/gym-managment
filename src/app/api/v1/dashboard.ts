"use server";

import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import client from "./client";
import { cookies } from "next/headers";

const gymHomeBackImage = 'gymHomeBackImage';

async function importJSON(): Promise<Dashboard> {
  const content = await readFile(path.join(process.cwd(), "dashboard.json"));

  return JSON.parse(content.toString("utf-8")) satisfies Dashboard;
}

async function exportJSON(dashboard: Dashboard) {
  await writeFile(
    path.join(process.cwd(), "dashboard.json"),
    JSON.stringify(dashboard)
  );
}

type Plan = {
  id: number;

  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null | undefined;
}

type Product = {
  id: number;

  name: string;
  description: string;
  price: number;
  marka: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null | undefined;
}

type Contacts = {
  email: string;
  facebook: string;
  whatsapp: string;
  instagram: string;
  twitter: string;
};

type Dashboard = {
  gymTitle: string;
  starterSentence: string;
  secondStarterSentence: string;
  plansParagraph: string;
  adsOnImageBoldText: string;
  adsOnImageDescription: string;
  contacts: Contacts;
};

export async function getHomeGeneralInfo(): Promise<
  { title: string; sentence: string; secondSentence: string, plansDescription: string } | "error" | "unauthorized"
> {
  try {
    await client.$connect();

    const d = await importJSON();

    return { title: d.gymTitle, sentence: d.starterSentence, secondSentence: d.secondStarterSentence, plansDescription: d.plansParagraph  };
  } catch (e) {
    console.log("failed to fetch dashboard general info: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getHomeInfo(): Promise<
  Dashboard | "error" | "unauthorized"
> {
  try {
    await client.$connect();

    return await importJSON();
  } catch (e) {
    console.log("failed to fetch dashboard general info: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function updateHomeGeneralInfo({
  title,
  starter,
  secondStarter,
  description,
}: {
  title: string | null;
  starter: string | null;
  secondStarter: string | null;
  description: string | null
}): Promise<boolean | "error" | "unauthorized"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) {
      console.log("unauthorized");
      return "unauthorized";
    }
    if (!(await client.user.count({ where: { session: sc.value } }))) {
      console.log("unauthorized");
      return "unauthorized";
    }
  } catch (e) {
    console.log("failed to fetch user auth status: " + e);
    return "error";
  } finally {
    client.$disconnect();
  }

  //

  try {
    const dashboard = await importJSON();

    dashboard.gymTitle = title ?? dashboard.gymTitle;
    dashboard.starterSentence = starter ?? dashboard.starterSentence;
    dashboard.secondStarterSentence = secondStarter ?? dashboard.secondStarterSentence;
    dashboard.plansParagraph = description ?? dashboard.plansParagraph;

    await exportJSON(dashboard);
  } catch (e) {
    console.log("failed to update dashboard data: " + e);
    return "error";
  }

  console.log("Dashboard home general info successfully updated");
  return true;
}

export async function getPlanParagraph(): Promise<string | 'error'> {
    try {
        const p = await importJSON();

        return p.plansParagraph;
    } catch (e) {
        console.log(e);
        return 'error';
    }
}

export async function updatePlanParagraph(paragraph: string): Promise<'success' | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get("session");
        if (!sc) {
            console.log("unauthorized");
            return "unauthorized";
        }
        if (!(await client.user.count({ where: { session: sc.value } }))) {
            console.log("unauthorized");
            return "unauthorized";
        }

        const g = await importJSON();

        g.plansParagraph = paragraph;

        await exportJSON(g);
        return 'success';
    } catch (e) {
        console.log(e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getHomePlans(): Promise<Plan[] | "unauthorized" | "error"> {
  try {
    const plans = await client.plan.findMany({ include: { features: true } });
    return plans.map(p => {
      return {...p,
        features: p.features.map( f => f.name ),
        price: p.price.toNumber(),
        createdAt: p.createdAt.toDateString(),
        updatedAt: p.createdAt.toDateString(),
        deletedAt: p.createdAt?.toDateString()
      }
    });
  } catch (e) {
    console.log("failed to fetch plans: " + e);
    return "error";
  } finally {
  }
}

export async function addPlanForm(formData: FormData) {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return;
    if (!(await client.user.count({ where: { session: sc.value } }))) return;
  } catch (e) {
    console.log("failed to add a plan: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }

  const title: string | null = formData.get("plan-title") as unknown as string;
  const description: string | null = formData.get(
    "plan-description"
  ) as unknown as string;
  const price: number | null = formData.get("plan-price") as unknown as number;
  const duration: string | null = formData.get('plan-duration') as unknown as string;

  if (!title || !description || !price || !duration) {
    console.log("failed to add a plan: invalid data");
    return;
  }

  try {
    await client.plan.create({ data: {
      title,
      description,
      price,
      duration,
    } });
  } catch (e) {
    console.log("failed to add a plan: " + e);
  }
}

export async function addPlan(plan: { title: string, description: string, price: number, duration: string, features: string[] }): Promise<"success" | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";
  } catch (e) {
    console.log("failed to add a plan: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }

  try {
    const createdPlan = await client.plan.create({ data: { 
      duration: plan.duration, 
      title: plan.title, 
      description: plan.description, 
      price: plan.price 
    }});

    if (!createdPlan) return 'error';

    for (let f in plan.features) {
      await client.planFeature.create({ data: { name: f, planId: createdPlan.id  } });
    }
    return "success";
  } catch (e) {
    console.log("failed to add a plan: " + e);
    return "error";
  }
}

export async function deletePlan(name: string): Promise<boolean | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    await client.plan.delete({ where: { title: name } });

    return true;
  } catch (e) {
    console.log("failed to delete a plan: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getAdsInfo(): Promise<
  { title: string; description: string } | "unauthorized" | "error"
> {
  try {
    const d = await importJSON();

    return {
      title: d.adsOnImageBoldText,
      description: d.adsOnImageDescription,
    };
  } catch (e) {
    console.log("failed to get ads info: " + e);
    return "error";
  } finally {
  }
}

export async function updateAdsInfo(data: {
  title: string;
  description: string;
}): Promise<"success" | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    const d = await importJSON();

    d.adsOnImageBoldText = data.title;
    d.adsOnImageDescription = data.description;

    await exportJSON(d);

    return "success";
  } catch (e) {
    console.log("failed to update ads info: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getHomeProducts(): Promise<(Product & { category: { id: number, name: string } })[] | "unauthorized" | "error"> {
  try {
    const products = await client.product.findMany({ include: { category: true } });
  
    return products.map(p => {
      return {...p, 
        price: p.price.toNumber(),
        createdAt: p.createdAt.toDateString(),
        updatedAt: p.updatedAt.toDateString(),
        deletedAt: p.deletedAt?.toDateString() ?? null
      }
    })
  } catch (e) {
    console.log("failed to get a product: " + e);
    return "error";
  }
}

export async function addHomeProduct(product: { name: string, description: string, price: number, marka: string, category: string }): Promise<number | 'categoryNotFound' | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    const category = await client.productCategory.findUnique({ where: { name: product.category } });

    if (!category) return 'categoryNotFound';

    const newProduct = await client.product.create({ data: {
      name: product.name,
      description: product.description,
      price: product.price,
      marka: product.marka,

      categoryId: category.id
    } });

    return newProduct.id;
  } catch (e) {
    console.log("failed to add a product: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteHomeProduct(name: string): Promise<"success" | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    await client.product.delete({ where: { name } });

    return "success";
  } catch (e) {
    console.log("failed to delete home products: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getProductCategories(): Promise<{ id: number, name: string }[] | 'error'> {
  try {
    const categories = await client.productCategory.findMany({});
  
    return categories.map(c => {
      return { name: c.name, id: c.id };
    });

  } catch (e) {
    console.log("failed to get product categories: " + e);
    return "error";
  }
}

export async function getCategoryProducts(): Promise<{id: number, cat: string, data: Product[]}[] | 'error'> {
  try {
    const categories = await client.productCategory.findMany({
      include: { products: true }
    });

    return categories.map(c => {
      return {
        id: c.id,
        cat: c.name,
        data: c.products.map(p => { 
          return {...p, 
            price: p.price.toNumber(),
            createdAt: p.createdAt.toDateString(), 
            updatedAt: p.updatedAt.toDateString(), 
            deletedAt: p.deletedAt?.toDateString()
          } 
        }) 
      }
    })

  } catch (e) {
    console.log("failed to get product categories: " + e);
    return "error";
  }
}

export async function getProductsOfCategory(category: string): Promise<Product[] | 'error'> {
  try {
    const categories = await client.productCategory.findUnique({
      where: { name: category },

      include: { products: true }
    });

    if (!categories) return [];

    return categories.products.map(p => { 
      return {...p, 
        price: p.price.toNumber(),
        createdAt: p.createdAt.toDateString(), 
        updatedAt: p.updatedAt.toDateString(), 
        deletedAt: p.deletedAt?.toDateString()
      } 
    })

  } catch (e) {
    console.log("failed to get products of a category: " + e);
    return "error";
  }
}

export async function addProductCategory(name: string): Promise<number | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    const category = await client.productCategory.create({ data: { name }});

    return category.id;
  } catch (e) {
    console.log("failed to create a product category: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteProductCategoryById(id: number): Promise<'success' | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    await client.productCategory.delete({ where: { id } });

    return "success";
  } catch (e) {
    console.log("failed to delete a product category: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteProductCategoryByName(name: string): Promise<'success' | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    await client.productCategory.delete({ where: { name } });

    return "success";
  } catch (e) {
    console.log("failed to delete a product category: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getContacts(): Promise<Contacts | "unauthorized" | "error"> {
  try {
    const d = await importJSON();

    return d.contacts;
  } catch (e) {
    console.log("failed to get contacts: " + e);
    return "error";
  } finally {
  }
}

export async function updateContacts(
  contacts: Contacts
): Promise<"success" | "unauthorized" | "error"> {
  try {
    await client.$connect();

    const sc = cookies().get("session");
    if (!sc) return "unauthorized";
    if (!(await client.user.count({ where: { session: sc.value } })))
      return "unauthorized";

    const d = await importJSON();

    d.contacts = contacts;

    await exportJSON(d);

    return "success";
  } catch (e) {
    console.log("failed to update contacts: " + e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}
