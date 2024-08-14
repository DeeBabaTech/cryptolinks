import { LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function EarnTasks() {
  return (
    <div className='text-center py-5 px-2'>
      <div>Complete Tasks to Earn More</div>
      <p className='my-2'>
        Finish <span className='text-yellow-300'>500</span> tasks to claim{" "}
        <span className='text-green-500'> 🌳 10 USDT</span>{" "}
      </p>
      <div className='bg-[#002247] flex items-center justify-between rounded-lg my-5'>
        <div className='w-20'>
          <Image width={100} height={100} src='/tasks.svg' alt='task icon' />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p>Tasks: 0/50</p>
          <LinearProgress
            variant='determinate'
            value={50}
            color='success'
            sx={{ height: 10 }}
          />
        </div>
        <div className='bg-green-400 px-2 py-1 rounded-md'>Claim</div>
      </div>
      
    </div>
  );
}
