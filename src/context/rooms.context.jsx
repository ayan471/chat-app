/* eslint-disable import/no-duplicates */
import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';

const RoommsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');
    roomListRef.on('value', snap => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });
    return () => {
      roomListRef.off();
    };
  }, []);
  return (
    <RoommsContext.Provider value={rooms}>{children}</RoommsContext.Provider>
  );
};
