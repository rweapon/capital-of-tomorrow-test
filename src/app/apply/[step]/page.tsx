import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components';

import PayAndSubmit from '@/app/apply/[step]/Pay&Submit';
import { ProgressBar, progressStep } from '@/views/Apply/ProgressBar';

const StepOne = dynamic(
  () => import('@/views/Apply/Steps/StepOne').then((res) => res.default),
  {
    ssr: false,
  }
);
const StepTwo = dynamic(
  () => import('@/views/Apply/Steps/StepTwo').then((res) => res.default),
  {
    ssr: false,
  }
);
const StepThree = dynamic(
  () => import('@/views/Apply/Steps/StepThree').then((res) => res.default),
  {
    ssr: false,
  }
);
const StepFour = dynamic(
  () => import('@/views/Apply/Steps/StepFour').then((res) => res.default),
  {
    ssr: false,
  }
);

type Props = {
  params: { step: string };
};

export function generateStaticParams() {
  return [{ step: '1' }, { step: '2' }, { step: '3' }, { step: '4' }];
}

const Apply = ({ params }: Props) => {
  const numStep = parseInt(params.step);

  // Validate step
  if (![1, 2, 3, 4].includes(numStep)) {
    notFound();
  }

  const stepComponent: Record<number, React.ReactElement> = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
  };

  return (
    <section className='container flex flex-col gap-8 md:gap-12 sm:gap-20'>
      <ProgressBar step={numStep as keyof typeof progressStep} />
      {stepComponent[numStep]}
      <div
        className={cn(
          'flex items-center w-full',
          numStep === 1 ? 'justify-end' : 'justify-between'
        )}
      >
        {numStep > 1 && (
          <Link href={`/apply/${numStep - 1}`}>
            <Button
              variant='secondary'
              className='font-semibold !text-xl p-3 md:p-5 lg:py-5 lg:px-14'
            >
              Previous
            </Button>
          </Link>
        )}
        {numStep < 4 && (
          <Link href={`/apply/${numStep + 1}`}>
            <Button className='font-semibold !text-xl p-3 md:p-5 lg:py-5 lg:px-14'>
              Next
            </Button>
          </Link>
        )}
        {numStep === 4 && <PayAndSubmit />}
      </div>
    </section>
  );
};

export default Apply;
