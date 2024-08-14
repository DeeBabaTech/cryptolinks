// components/TapToEarnTab.jsx
import { LinearProgress } from "@mui/material";
import Image from "next/image";

export default function TapToEarnTab({ user }) {
  return (
    <div className='p-5 h-[80%]'>
      <div className='flex justify-between items-center rounded-lg bg-[#002247] py-3 px-4'>
        <div className='flex items-center w-1/4'>
          <div className='w-10'>
            <Image
              width={100}
              height={100}
              src='/coineal.svg'
              alt='coin'
              priority
            />
          </div>
          <div className='truncate ml-2'>{user?.firstname || "Ademiluyi"}</div>
        </div>
        <div className='flex flex-col items-center relative before:absolute before:h-full before:bg-slate-400 before:w-0.5 before:-left-5 after:absolute after:-right-5 after:h-full after:bg-slate-400 after:w-0.5'>
          <div className='text-slate-300 text-xs'>Earn per Tap</div>
          <div className='text-yellow-300 font-bold text-xl'>+2</div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-slate-300 text-xs'>Coins to level</div>
          <div className='text-yellow-300 font-bold text-xl'>10k</div>
        </div>
      </div>
      <div className='w-fit mx-auto mt-4 text-lg'>🌱 Newbie</div>
      <div className='flex items-center justify-center gap-1 my-4'>
        <div className='w-8'>
          <Image
            width={100}
            height={100}
            src='/coineal.svg'
            alt='png token'
            priority
          />
        </div>
        <div className='text-3xl font-bold'>180</div>
      </div>
      {/* Progress bar */}
      <div className='flex justify-between items-center mb-1'>
        <div className='text-xl'>Cryptolink</div>
        <div className='text-slate-400'>Lvl 1/10</div>
      </div>
      <LinearProgress
        variant='determinate'
        value={50}
        color='success'
        sx={{ height: 10 }}
      />
      {/* Coin tap */}
      <div className='my-9 w-fit mx-auto'>
        <Image
          width={200}
          height={200}
          src='/coin.webp'
          alt=''
          className='rounded-full'
          priority
        />
      </div>
      {/* Bottom */}
      <div className='flex justify-between items-center text-sm'>
        <div className='flex items-center gap-1 '>
          <div className='w-3'>
            <Image
              width={100}
              height={100}
              src='/lightening.svg'
              alt=''
              priority
            />
          </div>
          <div className='text-yellow-300'>1000/1000</div>
        </div>
        <div className='flex items-center gap-3 rounded-full bg-[#2A522B] px-3 py-1'>
          <div className='w-5'>
            <Image
              width={100}
              height={100}
              src='/treasure.svg'
              alt=''
              priority
            />
          </div>
          <div>Earn More</div>
        </div>
        <div className='flex items-center gap-3 rounded-full bg-[#2A522B] px-4 py-2'>
          <div className='w-5'>
            <Image width={100} height={100} src='/rocket.svg' alt='' priority />
          </div>
          <div>Boost</div>
        </div>
      </div>
    </div>
  );
}
