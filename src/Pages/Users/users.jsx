import React, { useEffect } from 'react';
import UsersGrid from '../../Componente/UsersGrid/UsersGrid';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/Slices/UsersSlice';
import UserNav from '../../Componente/UserNav/UserNav';
import { motion } from 'framer-motion';
import { fadeIn } from '../../Utils/motion';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, take: 3 }));
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col w-full">
        <UserNav />
        <motion.div 
          className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8"
          variants={fadeIn("right", "spring", 0.2, 1)}
          initial="hidden"
          animate="show"
        >
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <UsersGrid />
          </div>
        </motion.div>
      </div>
    </>
  );
}