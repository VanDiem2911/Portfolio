import React from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Resume({ language }) {
  const data = portfolioData[language].resume;

  return (
    <section id="resume" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-600 dark:text-brandGreen-600 text-xs font-bold uppercase tracking-widest mb-2">
            {data.subtitle}
          </span>
          <h2 className="inline-block text-3xl md:text-4xl font-title font-bold text-stone-900 dark:text-stone-50 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-brandBlue-600 dark:after:bg-brandBlue-500 after:rounded">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Education & Certifications & Skills */}
          <div className="flex flex-col gap-10 reveal reveal-left">
            {/* Education */}
            <div>
              <h3 className="text-lg font-bold font-title border-b-2 border-brandBlue-100 dark:border-brandBlue-900/40 pb-2 mb-6 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-brandBlue-600 dark:after:bg-brandBlue-500 text-stone-900 dark:text-stone-100">
                <GraduationCap size={20} className="inline mr-2 -mt-1" />
                {data.educationTitle}
              </h3>
              <div className="flex flex-col gap-6">
                {data.education.map((edu, i) => (
                  <div className="relative pl-5 border-l-2 border-stone-200 dark:border-stone-850 after:content-[''] after:absolute after:top-1.5 after:-left-[6px] after:w-2.5 after:h-2.5 after:rounded-full after:bg-brandBlue-600 dark:after:bg-brandBlue-500" key={i}>
                    <span className="font-title text-xs font-bold text-brandBlue-600 dark:text-brandBlue-400 block mb-1">
                      {edu.duration}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 italic block mt-0.5">
                      {edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications list */}
            <div>
              <h3 className="text-lg font-bold font-title border-b-2 border-brandBlue-100 dark:border-brandBlue-900/40 pb-2 mb-6 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-brandBlue-600 dark:after:bg-brandBlue-500 text-stone-900 dark:text-stone-100">
                <Award size={20} className="inline mr-2 -mt-1" />
                {data.certsTitle}
              </h3>
              <div className="flex flex-col gap-3">
                {data.certsList.map((cert, i) => (
                  <div className="flex items-center gap-3 text-sm text-stone-800 dark:text-stone-200 bg-brandBeige-50 dark:bg-stone-900/40 p-4 rounded-xl border border-stone-200 dark:border-stone-800/80 premium-card-hover hover:translate-x-1.5" key={i}>
                    <CheckCircle2 size={16} className="text-brandGreen-600 flex-shrink-0" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-bold font-title border-b-2 border-brandBlue-100 dark:border-brandBlue-900/40 pb-2 mb-6 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-brandBlue-600 dark:after:bg-brandBlue-500 text-stone-900 dark:text-stone-100">
                {data.skillsTitle}
              </h3>
              <div className="flex flex-col gap-5">
                {data.skills.map((skill, i) => (
                  <div className="flex flex-col gap-2" key={i}>
                    <div className="flex justify-between text-xs font-semibold text-stone-800 dark:text-stone-200">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brandBlue-600 to-brandBlue-700 dark:from-brandBlue-500 dark:to-brandBlue-600 rounded-full transition-all duration-1000" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Work Experience */}
          <div className="flex flex-col gap-10 reveal reveal-right delay-200">
            <div>
              <h3 className="text-lg font-bold font-title border-b-2 border-brandBlue-100 dark:border-brandBlue-900/40 pb-2 mb-6 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-brandBlue-600 dark:after:bg-brandBlue-500 text-stone-900 dark:text-stone-100">
                <Briefcase size={20} className="inline mr-2 -mt-1" />
                {data.experienceTitle}
              </h3>
              <div className="flex flex-col gap-8">
                {data.experience.map((exp, i) => (
                  <div className="relative pl-5 border-l-2 border-stone-200 dark:border-stone-850 after:content-[''] after:absolute after:top-1.5 after:-left-[6px] after:w-2.5 after:h-2.5 after:rounded-full after:bg-brandBlue-600 dark:after:bg-brandBlue-500" key={i}>
                    <span className="font-title text-xs font-bold text-brandBlue-600 dark:text-brandBlue-400 block mb-1">
                      {exp.duration}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-stone-500 dark:text-stone-400 italic block mt-0.5">
                      {exp.bank}
                    </span>
                    <div className="mt-4 flex flex-col gap-2">
                      {exp.achievements.map((bullet, idx) => (
                        <span className="text-xs md:text-sm text-stone-600 dark:text-stone-400 pl-4 relative before:content-['•'] before:text-brandGreen-600 before:absolute before:left-0 before:font-bold" key={idx}>
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
