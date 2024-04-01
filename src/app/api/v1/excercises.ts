"use server";

import { cookies } from "next/headers";
import client from "./client";

async function getAuthState() {
  const sc = cookies().get("session");

  if (!sc) return null;

  const user = await client.user.findUnique({ where: { session: sc.value } });

  return user;
}

type Section = {
  id: number;
  name: string;
};

type Excercise = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
};

type SectionWithExcercises = Section & { excercises: Excercise[] };

// Sections

export async function getAllSections(): Promise<Section[] | "error"> {
  try {
    await client.$connect();

    const sections = await client.excerciseCategory.findMany({});

    return sections;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getSectionByName(
  name: string
): Promise<SectionWithExcercises | null | "error"> {
  try {
    await client.$connect();

    const sections = await client.excerciseCategory.findUnique({
      where: { name },
      include: { excercises: true },
    });

    return sections;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function createSection(
  name: string
): Promise<number | "unauthorized" | "error"> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    const created = await client.excerciseCategory.create({ data: { name } });

    return created.id;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteSection(
  name: string
): Promise<undefined | "unauthorized" | "error"> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excerciseCategory.delete({ where: { name } });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function updateSectionById(id: number, data: { name: string }): Promise<undefined | 'unauthorized' | 'error'> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excerciseCategory.update({ where: { id }, data: { name: data.name } });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteSectionWithExercises(name: string): Promise<undefined | "unauthorized" | 'error'> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excercise.deleteMany({ where: { category: { name } } });
    await client.excerciseCategory.delete({ where: { name } });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function countSectionExercises(name: string): Promise<number | 'error'> {
  try {
    await client.$connect();

    const count = await client.excercise.count({ where: { category: { name } } });

    return count;
  } catch (e) {
    console.log(`Could not count section exercises: ${e}`);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function getAllSectionsWithExcercises(): Promise<
  (Section & { excercises: Excercise[] })[] | "error"
> {
  try {
    await client.$connect();

    const sections = await client.excerciseCategory.findMany({
      include: { excercises: true },
    });

    return sections;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

// Excercises

export async function getAllExcercises(): Promise<Excercise[] | "error"> {
  try {
    await client.$connect();

    const excercises = await client.excercise.findMany({});

    return excercises;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getAllExcercisesOfSection(
  name: string
): Promise<Excercise[] | "error"> {
  try {
    await client.$connect();

    const section = await client.excerciseCategory.findUnique({
      where: { name },
      include: { excercises: true },
    });

    return section?.excercises ?? [];
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function createExcercise(data: {
  name: string;
  description: string;
  sectionName: string;
}): Promise<number | "sectionNotFound" | "unauthorized" | "error"> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    const section = await client.excerciseCategory.findUnique({
      where: { name: data.sectionName },
    });

    if (!section) return "sectionNotFound";

    const newExercise = await client.excercise.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: section.id,
      },
    });

    return newExercise.id;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteExcercise(
  name: string
): Promise<undefined | "unauthorized" | "error"> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excercise.delete({ where: { name } });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteExcerciseById(
  id: number
): Promise<undefined | "unauthorized" | "error"> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excercise.delete({ where: { id } });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function updateExcerciseById(id: number, data: Excercise): Promise<undefined | 'unauthorized' |'error'> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excercise.update({ where: { id }, data });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function updateExcerciseById2(id: number, data: { name: string, description: string }): Promise<undefined | 'unauthorized' |'error'> {
  try {
    await client.$connect();

    if (!(await getAuthState())) return "unauthorized";

    await client.excercise.update({ where: { id }, data });

    return;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}
