import React from 'react'
import { ArrowRightIcon } from '../../../theme/svg-icons';

export const IntrestedProjects = () => {

return (
    <section className="pb-0" aria-label="Similar Projects">
        <div className="container">
          <h2 className="text-heading-5 sm:text-heading-2 mb-7.5">You may be interested in...</h2>
          <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="transition-all ease-in border rounded-xl bg-neutral-100 border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
              <div className="flex flex-col gap-5 p-5">
                  <img src="/images/banner/projects/1.jpg" className="rounded-xl" alt="Project Title 2" />
                  <div>
                      <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">Project name Lorem ipsum dolor sit amet</h3>
                      <p className="text-sm font-normal line-clamp-2">Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet</p>
                  </div>
                  <button className="btn btn-primary filled">Donate now</button>
              </div>
            </div>
            <div className="hidden transition-all ease-in border sm:block bg-neutral-100 rounded-xl border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
              <div className="flex flex-col gap-5 p-5">
                  <img src="/images/banner/projects/2.jpg" className="rounded-xl" alt="Project Title 2" />
                  <div>
                      <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">Project name Lorem ipsum dolor sit amet</h3>
                      <p className="text-sm font-normal line-clamp-2">Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet</p>
                  </div>
                  <button className="btn btn-primary filled">Donate now</button>
              </div>
            </div>
            <div className="hidden transition-all ease-in border sm:block bg-neutral-100 rounded-xl border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
              <div className="flex flex-col gap-5 p-5">
                  <img src="/images/banner/projects/3.jpg" className="rounded-xl" alt="Project Title 2" />
                  <div>
                      <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">Project name Lorem ipsum dolor sit amet</h3>
                      <p className="text-sm font-normal line-clamp-2">Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet</p>
                  </div>
                  <button className="btn btn-primary filled">Donate now</button>
              </div>
            </div>
            <div className="hidden transition-all ease-in border sm:block bg-neutral-100 rounded-xl border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
              <div className="flex flex-col gap-5 p-5">
                  <img src="/images/banner/projects/4.jpg" className="rounded-xl" alt="Project Title 2" />
                  <div>
                      <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">Project name Lorem ipsum dolor sit amet</h3>
                      <p className="text-sm font-normal line-clamp-2">Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet</p>
                  </div>
                  <button className="btn btn-primary filled">Donate now</button>
              </div>
            </div>
          </div>
          {/* Slider control goes here */}
        </div>
      </section>
)

}
