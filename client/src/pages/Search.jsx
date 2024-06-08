import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import React, { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sortByASC: true,
    category: "",
  });
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [location.search]);

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
      <div className=" mx-auto max-w-fit mt-8">
        {/* top */}

        {/* top  */}
        {/* search input */}
        <div className=" flex items-center gap-2 ">
          {/* input form  */}
          <form onSubmit={onSubmit}>
            <div className="relative max-sm:max-w-[150px] flex items-center justify-center ">
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
              Latest
              <SortAsc />
            </Button>
          ) : (
            <Button
              id="sortDirection"
              variant="outline"
              onClick={onSortByChange}
              size="sm"
              className="rounded-2xl flex items-center justify-center gap-2"
            >
              Oldest
              <SortDesc />
            </Button>
          )}
        </div>
        {/* bottom */}
        <div className=" mt-4">
          <ToggleGroup
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prevValue) => {
                return { ...prevValue, category: value };
              })
            }
            size="sm"
            type="single"
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <h1>Speaking</h1>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <h1>Speaking</h1>
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <h1>Speaking</h1>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
