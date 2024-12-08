import React, { useState } from "react";
import Card from "../components/Card";
import { useGetAllNewsQuery } from "../app/newsApiSlice";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Archive = () => {
  const param = useParams();
  const [searchParams] = useSearchParams();

  const category_id = param.category_id;
  const search = searchParams.get("search");

  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetAllNewsQuery({
    page,
    search: search || category_id ? (search ? search : category_id) : "",
    searchParam: search || category_id ? (search ? "title" : "category") : "",
    pageSize: "10",
  });

  return (
    <div>
      <Header />
      <Card data={data} isLoading={isLoading} page={page} setPage={setPage} />
      <Footer />
    </div>
  );
};

export default Archive;
