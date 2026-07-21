import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { skills } from "@/content/site";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and methods"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Skills & methods" />
        </Reveal>
        <Reveal>
          <dl className="max-w-measure space-y-5">
            {skills.map((skill) => (
              <div key={skill.label}>
                <dt className="smallcaps text-maroon">{skill.label}</dt>
                <dd className="mt-1">{skill.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
