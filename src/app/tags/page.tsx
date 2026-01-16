import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "タグ",
};

const TagsPage = () => {
  notFound();
};

export default TagsPage;