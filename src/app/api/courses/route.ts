import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { ensureData, Course } from './_data'


type CourseLevel = "S" | "Pres" | "TC" | "MTC";
type CourseKind = "IELTS" | "TOEIC" | "4SKILLS" | "VSTEP";

const levels: CourseLevel[] = ["S", "Pres", "TC", "MTC"];
const kinds: CourseKind[] = ["IELTS", "TOEIC", "4SKILLS", "VSTEP"];

let COURSES: any[] | null = null;

function makeLessons(courseId: string, n: number) {
  return Array.from({ length: n }).map((_, i) => ({
    id: faker.string.uuid(),
    courseId,
    title: `Lesson ${i + 1}: ${faker.word.words({
      count: { min: 2, max: 5 },
    })}`,
    duration: faker.number.int({ min: 5, max: 30 }),
    url: "https://example.com/video.mp4",
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    status: "not-started",
    order: i + 1,
  }));
}

function makeCourses(count = 36) {
  return Array.from({ length: count }).map(() => {
    const id = faker.string.uuid();
    const totalLessons = faker.number.int({ min: 8, max: 24 });
    const level = faker.helpers.arrayElement(levels);
    const kind = faker.helpers.arrayElement(kinds);

    return {
      id,
      title:
        faker.helpers.arrayElement([
          "Essential Grammar",
          "Speaking Boost",
          "Reading Mastery",
          "Listening Lab",
          "Writing Workshop",
          "Exam Simulator",
          "Vocabulary Builder",
          "Skills Combo",
        ]) +
        " " +
        faker.number.int({ min: 101, max: 999 }),
      description: faker.lorem.sentences({ min: 2, max: 5 }),
      thumbnail: `https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop`,
      level,
      kindOfCourse: kind,
      totalLessons,
      progress: 0,
      lessons: makeLessons(id, totalLessons),
    };
  });
}

export async function GET(req: NextRequest) {
  if (!COURSES) {
    faker.seed(12345);
    COURSES = makeCourses(45);
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 9); // 9/page
  const q = (searchParams.get("q") ?? "").toLowerCase().trim();
  const levelParam = (searchParams.get("level") ?? "").trim();
  const level = levelParam as "" | CourseLevel;

  let data = COURSES;

  if (q) {
    data = data.filter((c) => c.title.toLowerCase().includes(q));
  }
  if (level && ["S", "Pres", "TC", "MTC"].includes(level)) {
    data = data.filter((c) => c.level === level);
  }

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * limit;
  const items = data.slice(start, start + limit);

  return NextResponse.json({
    items,
    page: current,
    limit,
    total,
    totalPages,
  });
}
