import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anurag - Portfolio" },
      { name: "description", content: "Portfolio of a Senior Full Stack Developer specializing in Python, Django, FastAPI, React, AWS, Cloud, Data Engineering and AI integrations." },
      { property: "og:title", content: "Anurag - Portfolio" },
      { property: "og:description", content: "Building scalable, secure and modern digital products with clean architecture and exceptional user experiences." },
    ],
  }),
  component: Portfolio,
});