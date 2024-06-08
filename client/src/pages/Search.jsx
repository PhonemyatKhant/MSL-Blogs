import { Input } from "@/components/ui/input";
import { Frown, Loader2, Search, SortAsc, SortDesc } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const SearchPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sortByASC: true,
    category: "",
  });
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

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
        setLoading(true);
        const urlString = urlParams.toString();

        const res = await fetch(`/api/post/all-posts?${urlString}`);
        const data = await res.json();

        if (res.ok) {
          setLoading(false);
          setFilteredPosts(data.posts);
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
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

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("sortDirection", !formData.sortByASC ? "asc" : "desc");

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  const onCategoryChange = (value) => {
    setStartIndex(0);
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("category", value);
    console.log(urlParams);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStartIndex(0);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", formData.searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const pageIndexChangeHandler = () => {
      const urlParams = new URLSearchParams(location.search);

      urlParams.set("startIndex", startIndex);

      const searchQuery = urlParams.toString();

      navigate(`/search?${searchQuery}`);
    };
    pageIndexChangeHandler();
  }, [startIndex]);

  return (
    <div className=" min-h-screen">
      {loading ? (
        <>
          {/* loading  */}
          {loading && (
            <div className=" min-h-screen text-black  text-4xl mx-auto max-w-fit mt-6    ">
              <Loader2 className="inline-block mr-2 w-6 h-full animate-spin" />
              Loading...
            </div>
          )}
        </>
      ) : (
        <>
          <Card className="my-6">
            <CardHeader>
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
                        value={formData.searchTerm || ""}
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
                    onValueChange={(value) => onCategoryChange(value)}
                    size="sm"
                    type="single"
                  >
                    {uniqueCategories.length !== 0 &&
                      uniqueCategories.map((x, index) => (
                        <ToggleGroupItem
                          key={index}
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
            </CardHeader>

            {/* posts grid layout  */}
            {filteredPosts.length === 0 ? (
              <div className="p-10">
                <Alert variant='destructive'>
                  <Frown className="h-4 w-4" />
                  <AlertTitle>Oops!</AlertTitle>
                  <AlertDescription>No matching post found.</AlertDescription>
                </Alert>
              </div>
            ) : (
              <CardContent>
                <div className="my-10 items-center grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                  {filteredPosts.length !== 0 &&
                    filteredPosts.map((filteredPost, index) => (
                      <PostCard key={index} post={filteredPost} />
                    ))}
                </div>
              </CardContent>
            )}

            <CardFooter className="max-w-fit gap-3 mx-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStartIndex((prevValue) => prevValue - 9)}
                disabled={startIndex <= 0}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStartIndex((prevValue) => prevValue + 9);
                }}
                disabled={filteredPosts.length < 9}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default SearchPage;
