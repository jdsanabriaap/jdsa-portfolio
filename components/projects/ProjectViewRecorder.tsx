"use client";

import { recordProjectView } from "@/lib/recent-projects";
import { useEffect } from "react";

type ProjectViewRecorderProps = {
  slug: string;
};

/** Records project slug in localStorage when a detail page is opened. */
export function ProjectViewRecorder({ slug }: ProjectViewRecorderProps) {
  useEffect(() => {
    recordProjectView(slug);
  }, [slug]);

  return null;
}
