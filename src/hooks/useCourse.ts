"use client";
import { useEffect, useState } from "react";
import { fetchCourse } from "@/lib/api";
import type { Course } from "@/types";

export function useCourse(id: string) {

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCourse(id)
      .then((c) => {
        setCourse(c);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
  }, [id]);

  return { course, loading, error, setCourse };
}
