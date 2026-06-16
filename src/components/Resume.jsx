import { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Resume({ language }) {
  const data = portfolioData[language].resume;
  const [animate, setAnimate] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const currentRef = skillsRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="resume" className="py-20 lg:py-28 bg-[#fdfbf7] dark:bg-[#090d16] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {data.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
          {/* Left Column: Education & Certifications & Skills */}
          <div className="flex flex-col gap-10 reveal reveal-left">
            {/* Education */}
            <div>
              <h3 className="text-lg font-bold font-title border-b border-stone-200 dark:border-stone-850 pb-3 mb-6 relative text-stone-955 dark:text-stone-50">
                <GraduationCap size={20} className="inline mr-2 -mt-1 text-brandGreen-700 dark:text-[#0df58b]" />
                {data.educationTitle}
                <span className="absolute bottom-[-1px] left-0 w-12 h-[1px] bg-brandGreen-600 dark:bg-[#0df58b]" />
              </h3>
              <div className="flex flex-col gap-6">
                {data.education.map((edu, i) => (
                  <div className="relative pl-5 border-l border-stone-200 dark:border-stone-800 after:content-[''] after:absolute after:top-1.5 after:-left-[5px] after:w-2.5 after:h-2.5 after:rounded-full after:bg-brandGreen-600 dark:after:bg-[#0df58b] after:shadow-[0_0_10px_rgba(13,245,139,0.3)]" key={i}>
                    <span className="font-title text-xs font-bold text-brandGreen-700 dark:text-[#0df58b] block mb-1">
                      {edu.duration}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-stone-50 block leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 italic block mt-1">
                      {edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications list */}
            <div>
              <h3 className="text-lg font-bold font-title border-b border-stone-200 dark:border-stone-850 pb-3 mb-6 relative text-stone-955 dark:text-stone-50">
                <Award size={20} className="inline mr-2 -mt-1 text-brandGreen-700 dark:text-[#0df58b]" />
                {data.certsTitle}
                <span className="absolute bottom-[-1px] left-0 w-12 h-[1px] bg-brandGreen-600 dark:bg-[#0df58b]" />
              </h3>
              <div className="flex flex-col gap-3">
                {data.certsList.map((cert, i) => (
                  <div className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300 bg-white dark:bg-[#111827]/40 p-4 rounded-xl border border-stone-200 dark:border-stone-850 premium-card-hover hover:translate-x-1.5" key={i}>
                    <CheckCircle2 size={16} className="text-brandGreen-700 dark:text-[#0df58b] flex-shrink-0" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            
          </div>

          {/* Right Column: Work Experience */}
          <div className="flex flex-col gap-10 reveal reveal-right delay-200">
            <div>
              <h3 className="text-lg font-bold font-title border-b border-stone-200 dark:border-stone-850 pb-3 mb-6 relative text-stone-955 dark:text-stone-50">
                <Briefcase size={20} className="inline mr-2 -mt-1 text-brandGreen-700 dark:text-[#0df58b]" />
                {data.experienceTitle}
                <span className="absolute bottom-[-1px] left-0 w-12 h-[1px] bg-brandGreen-600 dark:bg-[#0df58b]" />
              </h3>
              <div className="flex flex-col gap-8">
                {data.experience.map((exp, i) => (
                  <div className="relative pl-5 border-l border-stone-200 dark:border-stone-800 after:content-[''] after:absolute after:top-1.5 after:-left-[5px] after:w-2.5 after:h-2.5 after:rounded-full after:bg-brandGreen-600 dark:after:bg-[#0df58b] after:shadow-[0_0_10px_rgba(13,245,139,0.3)]" key={i}>
                    <span className="font-title text-xs font-bold text-brandGreen-700 dark:text-[#0df58b] block mb-1">
                      {exp.duration}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-snug">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-stone-600 dark:text-stone-400 italic block mt-1">
                      {exp.bank}
                    </span>
                    <div className="mt-4 flex flex-col gap-2">
                      {exp.achievements.map((bullet, idx) => (
                        <span className="text-xs md:text-sm text-stone-600 dark:text-stone-300 pl-4 relative before:content-['•'] before:text-brandGreen-600 dark:before:text-[#0df58b] before:absolute before:left-0 before:font-bold" key={idx}>
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
