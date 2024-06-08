import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import React, { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";

const SearchPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sortByASC: true,
    category: "",
  });
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  console.log(uniqueCategories);
  //   console.log(formData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const urlSearchTerm = urlParams.get("searchTerm");
    const urlCategory = urlParams.get("category");
    const urlSortBy = urlParams.get("sortDirection");

    if (urlCategory || urlSearchTerm || urlSortBy) {
      setFormData({
        ...formData,
        searchTerm: urlSearchTerm,
        category: urlCategory,
        sortByASC: urlSortBy === "asc" ? true : false,
      });
    }
    const fetchPosts = async () => {
      try {
        const urlString = urlParams.toString();

        const res = await fetch(`/api/post/all-posts?${urlString}`);
        const data = await res.json();

        if (res.ok) {
          setFilteredPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  useEffect(() => {
    const getUniqueCategories = async () => {
      try {
        const res = await fetch("/api/post/all-categories");
        const data = await res.json();

        if (res.ok) {
          setUniqueCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUniqueCategories();
  }, []);

  const onSortByChange = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const urlParams = new URLSearchParams(location.search);
    // setFormData((pre) => {
    //   return { ...pre, sortByASC: formData.sortByASC ? false : true };
    // });

    urlParams.set("sortDirection", !formData.sortByASC ? "asc" : "desc");
    console.log(urlParams);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  const onCategoryChange = (value) => {
    const urlParams = new URLSearchParams(location.search);
    // setFormData((pre) => {
    //   return { ...pre, category: value};
    // });

    urlParams.set("category", value);
    console.log(urlParams);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", formData.searchTerm);

    const searchQuery = urlParams.toString();
    console.log(searchQuery);

    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className=" min-h-screen">
      {/* top bar  */}
      <div className=" mx-auto max-w-fit mt-8">
        {/* top */}

        {/* top  */}
        {/* search input */}
        <div className=" flex items-center justify-between gap-2 ">
          {/* input form  */}
          <form className=" flex-1" onSubmit={onSubmit}>
            <div className="relative max-sm:max-w-[150px] flex  items-center justify-center ">
              <Input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    searchTerm: e.target.value,
                  })
                }
                id="searchTerm"
                className="rounded-3xl w-full "
                type="text"
                value={formData.searchTerm}
                placeholder="Search..."
              />
              <span className="absolute text-muted-foreground mr-3  right-0">
                <Search />{" "}
              </span>
            </div>
          </form>
          {/* sort icon  */}
          {formData.sortByASC ? (
            <Button
              id="sortDirection"
              variant="outline"
              onClick={onSortByChange}
              size="sm"
              className="rounded-2xl flex items-center justify-center gap-2"
            >
              {" "}
              Oldest
              <SortDesc />
            </Button>
          ) : (
            <Button
              id="sortDirection"
              variant="outline"
              onClick={onSortByChange}
              size="sm"
              className="rounded-2xl flex items-center justify-center gap-2"
            >
              Newest
              <SortAsc />
            </Button>
          )}
        </div>
        {/* bottom */}
        <div className="  mt-4">
          <ToggleGroup
            className=" flex flex-wrap max-w-screen-md"
            value={formData.category}
            // onValueChange={(value) =>
            //   setFormData((prevValue) => {
            //     return { ...prevValue, category: value };
            //   })
            // }
            onValueChange={(value) => onCategoryChange(value)}
            size="sm"
            type="single"
          >
            {uniqueCategories.length !== 0 &&
              uniqueCategories.map((x) => (
                <ToggleGroupItem
                  className=" rounded-3xl"
                  value={x.category}
                  aria-label={x.category}
                >
                  <h1>{x.category} </h1>
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
        </div>
      </div>

      {/* posts grid layout  */}
      <div className="my-10 items-center grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {filteredPosts.length !== 0 &&
          filteredPosts.map((filteredPost, index) => (
            <PostCard key={index} post={filteredPost} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
