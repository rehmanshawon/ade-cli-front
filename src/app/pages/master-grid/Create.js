import React, { useEffect, useState } from "react";
import API from "../../helpers/devApi";

const Create = ({ slug_name, slug_type }) => {
  const [loading, setLoading] = useState(false);

  const getGridData = async (slug_name, slug_type) => {
    setLoading(true);
    if (slug_name && slug_type) {
      await API.get(
        `/sys_masters?slug_name=${slug_name}&slug_type=${slug_type}`
      )
        .then((res) => {
          if (res.data?.success) {
            console.log({ res });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    getGridData(slug_name, slug_type);
  }, [slug_name, slug_type]);

  return <div>{slug_name} create</div>;
};

export default Create;
