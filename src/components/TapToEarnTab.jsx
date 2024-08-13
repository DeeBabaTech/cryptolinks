// components/TapToEarnTab.jsx
import { LinearProgress } from "@mui/material";
import Image from "next/Image";

export default function TapToEarnTab() {
  return (
    <div className='p-5 pb-28'>
      <div className='flex justify-between items-center'>
        <div>Cancel</div>
        <div className='flex flex-col items-center'>
          <div className='text-2xl'>Cryptolink</div>
          <div className='text-slate-400'>bot</div>
        </div>
        <div>Menu</div>
      </div>
      <div>
        <div className='flex justify-between items-center mt-5 rounded-lg bg-[#000e1e] p-5'>
          <div className='flex items-center w-1/4'>
            <Image
              width={100}
              height={100}
              src='/coineal.png'
              alt='coin'
              className='w-10'
              priority
            />
            <div className='truncate ml-2'>Ademiluyi</div>
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
        <div className='flex items-center justify-center gap-1 my-5'>
          <Image
            width={100}
            height={100}
            src='/coineal.png'
            alt='png token'
            className='w-10'
            priority
          />
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
        <div className='flex justify-center my-10'>
          <Image
            width={100}
            height={100}
            src='/token.png'
            alt=''
            className='w-3/4'
            priority
          />
        </div>
        {/* Bottom */}
        <div className='flex justify-between items-center text-sm'>
          <div className='text-normal'>1000/1000</div>
          <div className='flex items-center gap-1 rounded-full bg-[#2A522B] px-3 py-2'>
            <Image
              width={100}
              height={100}
              src='/coineal.png'
              alt=''
              className='w-10'
              priority
            />
            <div>Earn More</div>
          </div>
          <div className='flex items-center gap-1 rounded-full bg-[#2A522B] px-3 py-2'>
            <Image
              width={100}
              height={100}
              src='/coineal.png'
              alt=''
              className='w-10'
              priority
            />
            <div>Boost</div>
          </div>
        </div>
      </div>
    </div>
  );
}
