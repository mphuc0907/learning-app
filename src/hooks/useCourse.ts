"use client";
import { useEffect, useState } from "react";
import { fetchCourse } from "@/lib/api";
import type { Course } from "@/types";

export function useCourse(id: string) {
  console.log(id, "idcourse");

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
        console.log(c, "useCourse");
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || "Error");
        console.log('cancellederror', e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    // return () => { cancelled = true }
  }, [id]);

  return { course, loading, error, setCourse };
}
