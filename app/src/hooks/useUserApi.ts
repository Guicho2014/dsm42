import { useEffect, useState, useContext } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { UserRespose } from "../interfaces/pandoraApiRest";
import { FormUserData } from "./useFormUser";
import { ConfigContext } from "../context/ConfigContext";

interface UseUserApi{
  isLoading:  boolean;
  listUser:   UserRespose[];
  loadUsers:  () => void;
  createUser: ( data: FormUserData ) => void;
  updateUser: ( data: FormUserData ) => void;
  deleteUser: ( data: FormUserData ) => void;
}

export const useUserApi = (): UseUserApi => {
  const { ip } = useContext(ConfigContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ listUser, setListUser ] = useState<UserRespose[]>([]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<UserRespose[]>( `http://${ip}:3000/users` );
      setListUser( response.data );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect( () => {
    loadUsers();
  },[]);

  const createUser = async ( data: FormUserData ) => {
    const dataBody = {
      username: data.username,
      password: data.password,
      email: data.email,
      image: data.image,
      location: data.location
    }
    try {
      await pandoraApi.post( `http://${ip}:3000/users`, dataBody );
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async ( data: FormUserData ) => {
    try {
      if ( data.password ){
        const dataBody = {
          username: data.username,
          password: data.password,
          email: data.email,
          image: data.image,
          location: data.location
        }
        await pandoraApi.patch( `http://${ip}:3000/users/${data.id_user}`, dataBody );
      }else {
        const dataBody = {
          username: data.username,
          email: data.email,
          image: data.image,
          location: data.location
        }
        await pandoraApi.patch( `http://${ip}:3000/users/${data.id_user}`, dataBody );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async ( data: FormUserData ) => {
    try {
      await pandoraApi.delete( `http://${ip}:3000/users/${data.id_user}`);
    } catch (error) {
      console.log(error);
    }
  }

  return { isLoading, listUser, loadUsers, createUser, updateUser, deleteUser };
}