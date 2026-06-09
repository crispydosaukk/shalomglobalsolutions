import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const teamHighlights = [
{ icon: 'ShieldCheckIcon', text: 'DBS checked & identity verified', color: 'text-secondary' },
{ icon: 'AcademicCapIcon', text: 'Professionally trained in all service areas', color: 'text-primary' },
{ icon: 'BriefcaseIcon', text: 'Legally employed per UK regulations', color: 'text-terracotta' },
{ icon: 'ClockIcon', text: 'Punctual, uniformed, and professional', color: 'text-amber-600' },
{ icon: 'UserGroupIcon', text: 'Customer-focused service approach', color: 'text-teal-600' },
{ icon: 'HeartIcon', text: 'Health & safety compliant at all times', color: 'text-pink-500' }];


export default function AboutTeamValues() {
  return (
    <section className="py-20 bg-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">Our Team</span>
          <h2 className="text-section-title text-primary mb-4">
            The Foundation of<br />
            <span className="text-secondary">Our Success</span>
          </h2>
          <p className="text-muted-foreground font-500 max-w-xl mx-auto leading-relaxed">
            Our employees are the heart of Shalom Global Solution. We invest in their development, wellbeing, and professional growth to ensure exceptional service delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-4xl overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1547c46fd-1763299917427.png"
                  alt="Professional female team member in smart uniform, friendly and confident in bright work environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover" />
                
              </div>
              <div className="rounded-4xl overflow-hidden mt-8">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_14efa66f7-1772257127195.png"
                  alt="Professional male team member smiling in work uniform, bright clean professional environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover" />
                
              </div>
              <div className="rounded-4xl overflow-hidden -mt-8">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_107bcec45-1773085527984.png"
                  alt="Professional team member with warm smile in bright UK professional services environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover" />
                
              </div>
              <div className="rounded-4xl overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1353db03d-1771894285467.png"
                  alt="Professional male team member in clean uniform, confident and approachable expression"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover" />
                
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-800 text-primary mb-8">Why Our Team Stands Out</h3>
            <div className="space-y-5">
              {teamHighlights.map((item) =>
              <div key={item.text} className="flex items-center gap-4 bg-white border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={item.icon as any} size={20} className={item.color} />
                  </div>
                  <span className="font-600 text-sm text-foreground">{item.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}