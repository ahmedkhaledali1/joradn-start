'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Card from '@/components/card';
import Footer from '@/components/Footer';
import CategorySidebar from '@/components/categorySide';
import Header from '@/components/Header';
import axios from 'axios';
import { useLocale } from 'next-intl';
function CategoriesPartners() {
  const locale = useLocale();

  let query;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get('query');
  }
  // console.log(query);

  const [showSidebar, setShowSidebar] = useState(true);
  const [data1, setData] = useState([]);
  const [originData, setOrigidata] = useState([]);
  const [departmentSlelectedId, setdepartmentSlelectedId] = useState(
    query ? query : 1
  );
  const [subdepartmentSlelectedId, setsubdepartmentSlelectedId] = useState(0);
  console.log(subdepartmentSlelectedId);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const fetchCtegories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/${departmentSlelectedId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setSubcategories(response?.data?.data?.subcategories);
    } catch (error) {
      console.log(error);
    }
  }, [departmentSlelectedId]);

  const fetchPartnersByCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partners-by-category/${departmentSlelectedId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setData(response?.data?.data);
      setOrigidata(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, [departmentSlelectedId]);

  const fetchPartnersBySubategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/partners-by-subcategory/${subdepartmentSlelectedId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-localization': `${locale}`,
          },
        }
      );
      setData(response?.data?.data);
      setOrigidata(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, [subdepartmentSlelectedId]);
  useEffect(() => {
    setsubdepartmentSlelectedId(0);
  }, [departmentSlelectedId]);

  useEffect(() => {
    fetchCtegories();
    if (categories) {
      if (departmentSlelectedId) {
        fetchSubCategories();
        if (subdepartmentSlelectedId != 0) {
          fetchPartnersBySubategories();
        } else {
          fetchPartnersByCategories();
        }
      }
    }
  }, [departmentSlelectedId, subdepartmentSlelectedId]);

  return (
    <div>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex w-full sm:relative">
        {showSidebar && (
          <div
            className={`w-[20rem] h-fit mb-10 ${
              locale == 'ar' ? 'mr-10' : 'ml-10'
            }  sm:absolute sm:right-0 sm:w-full sm:z-50  border-l-gray-300`}
          >
            <CategorySidebar
              departmentSlelectedId={departmentSlelectedId}
              setdepartmentSlelectedId={setdepartmentSlelectedId}
              subdepartmentSlelectedId={subdepartmentSlelectedId}
              categories={categories}
              partenrs={data1}
              originData={originData}
              setPartenrs={setData}
            />
          </div>
        )}
        <div className="flex-grow ">
          <div className="h-[110vh]  w-full   ">
            <div className=" pl-16 w-full mt-20 sm:px-auto sm:mt-8 pr-10 ">
              {subcategories && (
                <div className=" flex gap-2 sm:gap-1 ">
                  {subcategories.map((subcategory) => (
                    <div
                      onClick={() =>
                        setsubdepartmentSlelectedId(subcategory.id)
                      }
                      key={subcategory.id}
                      className={`w-fit px-4 sm:px-2 py-2 sm:py-1 rounded-xl ${
                        subdepartmentSlelectedId == subcategory.id
                          ? ' bg-red-900 text-white'
                          : 'text-gray-700 bg-blue-gray-50'
                      }`}
                    >
                      {subcategory.name}
                    </div>
                  ))}
                </div>
              )}

              <div className="cards flex-grow grid grid-cols-4 xl:grid-cols-2 sm:!grid-cols-1 pt-8  gap-4">
                {data1.map((item) => (
                  <Card key={item.name} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-0 -z-10   ${
          locale == 'ar' ? 'left-0' : 'right-0'
        } `}
      >
        <Footer />
      </div>
    </div>
  );
}

export default CategoriesPartners;
