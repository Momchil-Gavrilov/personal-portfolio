import type { Metadata } from "next";
import CaseStudy, {
  caseStudyMetadata,
  caseStudyParams,
} from "@/components/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata(slug);
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudy slug={slug} />;
}
