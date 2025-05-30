import React, { useEffect, useContext, useState } from "react";

//INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../Components";
const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState();
  const [usercampaign, setUsercampaign] = useState();

  // useEffect(() => {
  //   const getCampaignsData = getCampaigns();
  //   const userCampaignsData = getUserCampaigns();
  //   return async () => {
  //     const allData = await getCampaignsData;
  //     const userData = await userCampaignsData;
  //     setAllcampaign(allData);
  //     setUsercampaign(userData);
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
        setAllcampaign(allData);
        setUsercampaign(userData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchData();
  }, []);
  
  



  //DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  return(
    <>
    <Hero titleData={titleData} createCampaign={createCampaign}/>
    <Card
      title="All Listed Campaign"
      allcampaign={allcampaign}
      setOpenModel={setOpenModel}
      setDonate={setDonateCampaign}
    />
    <Card
      title="Your Created Campaign"
      allcampaign={usercampaign}
      setOpenModel={setOpenModel}
      setDonate={setDonateCampaign}
    />

    {openModel && (
      <PopUp
       setOpenModel={setOpenModel}
       getDonations={getDonations}
       donate={donateCampaign}
       donateFunction={donate}
      /> 
    )}    
   </>
  );
};

export default index;

