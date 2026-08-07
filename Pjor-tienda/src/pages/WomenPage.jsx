import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './styles/WomenPage.scss';
import { NavigationBar } from '../components/NavigationBar';
import { ClothingMenuButton } from '../components/ClothingMenuButton';
import { ShoppingCartButton } from '../components/ShoppingCartButton';
import { ClothingBar } from '../components/ClothingBar';
import { ClothingGallery } from '../components/ClothingGallery';
import { ShoppingCart } from '../components/ShoppingCart';
import { ClothingModal } from '../components/ClothingModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { WarningModal } from '../components/WarningModal';
import { Footer } from '../components/Footer';

import { getProductsByDepartment } from '../services/productService';
import { getDepartmentMenu } from '../services/departmentService';


export const WomenPage = () => {


  const [isClothingBarOpen, setIsClothingBarOpen] = useState(false);

  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);

  const [isClothingModalOpen, setIsClothingModalOpen] = useState(false);

  const [clothingModalData, setClothingModalData] = useState(null);


  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


  const [dropdownMenus, setDropdownMenus] = useState([]);


  const [womenClothingItems, setWomenClothingItems] = useState([]);

  const [filteredClothingItems, setFilteredClothingItems] = useState([]);


  const [selectedGarmentTypes, setSelectedGarmentTypes] = useState([]);


  const [loading, setLoading] = useState(true);



  // Cargar productos

  useEffect(()=>{


    const fetchProducts = async()=>{


      try{


        const data = await getProductsByDepartment('women');


        console.log(
          'PRODUCTOS WOMEN:',
          data
        );


        setWomenClothingItems(data);

        setFilteredClothingItems(data);



      }catch(error){

        console.error(
          'ERROR PRODUCTOS WOMEN:',
          error
        );


      }finally{

        setLoading(false);

      }


    };


    fetchProducts();


  },[]);





  // Cargar menú dinámico

  useEffect(()=>{


    const fetchMenu = async()=>{


      try{


        const data = await getDepartmentMenu('women');


        console.log(
          'MENU WOMEN:',
          data
        );


        setDropdownMenus(data);



      }catch(error){


        console.error(
          'ERROR MENU WOMEN:',
          error
        );


      }


    };


    fetchMenu();


  },[]);





  // Filtro por garment type

  const handleSelectGarmentType = (
    garmentTypeId,
    checked
  )=>{


    setSelectedGarmentTypes(prev=>{


      let updated;



      if(checked){


        updated = [
          ...prev,
          garmentTypeId
        ];


      }else{


        updated = prev.filter(
          id => id !== garmentTypeId
        );


      }




      console.log(
        'GARMENTS WOMEN:',
        updated
      );




      if(updated.length === 0){


        setFilteredClothingItems(
          womenClothingItems
        );


      }else{


        const filtered =
          womenClothingItems.filter(product=>

            updated.includes(
              product.garment_type_id
            )

          );



        setFilteredClothingItems(filtered);


      }



      return updated;


    });


  };





  const toggleClothingBar = ()=>{

    setIsClothingBarOpen(
      prev=>!prev
    );

  };



  const openShoppingCart = ()=>{

    setShoppingCartIsOpen(true);

  };



  const closeShoppingCart = ()=>{

    setShoppingCartIsOpen(false);

  };



  const openClothingModal = (item)=>{


    setClothingModalData(item);

    setIsClothingModalOpen(true);


  };



  const closeClothingModal = ()=>{


    setClothingModalData(null);

    setIsClothingModalOpen(false);


  };



  const openWarningModal = ()=>{

    setIsWarningModalOpen(true);

  };


  const closeWarningModal = ()=>{

    setIsWarningModalOpen(false);

  };


  const openConfirmationModal = ()=>{

    setIsConfirmationModalOpen(true);

  };


  const closeConfirmationModal = ()=>{

    setIsConfirmationModalOpen(false);

  };




  return (

    <div className="women-page">


      <Header />

      <NavigationBar />



      <div className="women-page__clothing-section">



        {!isClothingBarOpen && (

          <ClothingMenuButton

            toggleClothingBar={toggleClothingBar}

            isOpen={isClothingBarOpen}

          />

        )}






        <ShoppingCartButton

          onClick={openShoppingCart}

          isOpen={isClothingBarOpen}

        />






        <ShoppingCart

          isOpen={shoppingCartIsOpen}

          onClose={closeShoppingCart}

        />







        <ClothingModal

          isOpen={isClothingModalOpen}

          onClose={closeClothingModal}

          data={clothingModalData}

          onWarning={openWarningModal}

          onConfirm={openConfirmationModal}

        />







        <ConfirmationModal

          isOpen={isConfirmationModalOpen}

          onClose={closeConfirmationModal}

        />






        <WarningModal

          isOpen={isWarningModalOpen}

          onClose={closeWarningModal}

        />







        {isClothingBarOpen && (


          <ClothingBar

            dropdownMenus={dropdownMenus}

            isOpen={isClothingBarOpen}

            toggleClothingBar={toggleClothingBar}

            onSelectGarmentType={handleSelectGarmentType}

          />


        )}







        {!loading && (


          <ClothingGallery

            items={filteredClothingItems}

            isClothingBarOpen={isClothingBarOpen}

            onOpenClothingModal={openClothingModal}

            onConfirm={openConfirmationModal}

            onWarning={openWarningModal}

          />


        )}




      </div>



      <Footer />


    </div>

  );


};