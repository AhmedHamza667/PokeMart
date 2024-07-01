import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { gql, useLazyQuery } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../store/authReducer";
import { authClient } from "../apollo";

const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      address
      countryCode
      firstName
      isActive
      isVerified
      lastName
    }
  }
`;

export default function Page() {
  const [token, setToken] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [getUser, { loading, data, error }] = useLazyQuery(GET_CURRENT_USER, {
    client: authClient,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        setRedirectTo("/LogIn");
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (data && data.getCurrentUser) {
      dispatch(updateUserDetails(data.getCurrentUser));
      setRedirectTo("/HomePage");
    } else if (error) {
      setRedirectTo("/LogIn");
    }
  }, [data, error]);

  if (redirectTo) {
    return <Redirect href={redirectTo} />;
  }

  return null;
}
