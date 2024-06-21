import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";
import Image from '../assets/images/news.jpg';

// loading screen imports
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarked, setBookmarked] = useState({});

  const pageSize = 6;

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  useEffect(() => {
    // Retrieve bookmarks from localStorage
    const storedBookmarks = localStorage.getItem("bookmarkedArticles")
      ? JSON.parse(localStorage.getItem("bookmarkedArticles"))
      : [];

    // Initialize bookmarked state based on localStorage
    const initialBookmarkedState = {};
    storedBookmarks.forEach((url) => {
      initialBookmarkedState[url] = true;
    });

    setBookmarked(initialBookmarkedState);
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to slice text into cards
  function sliceTextIntoCards(text, maxLength) {
    const cards = [];
    let start = 0;

    while (start < text?.length) {
      cards.push(text.slice(start, start + maxLength));
      start += maxLength;
    }

    return cards;
  }

  // Function to handle bookmarking
  const handleBookmark = (url) => {
    const storedBookmarks = localStorage.getItem("bookmarkedArticles")
      ? JSON.parse(localStorage.getItem("bookmarkedArticles"))
      : [];

    const newBookmarks = [...storedBookmarks];
    const bookmarkIndex = newBookmarks.indexOf(url);

    if (bookmarkIndex === -1) {
      newBookmarks.push(url); // Add bookmark
    } else {
      newBookmarks.splice(bookmarkIndex, 1); // Remove bookmark
    }

    localStorage.setItem("bookmarkedArticles", JSON.stringify(newBookmarks));

    setBookmarked((prevBookmarked) => ({
      ...prevBookmarked,
      [url]: !prevBookmarked[url],
    }));
  };

  if (loading && !newsData.length) {
    return (
      <Container>
        <Row>
          {[...Array(pageSize)].map((_, index) => (
            <Col xs={12} md={6} lg={4} key={index} style={{ marginTop: '20px' }}>
              <Card>
                <Skeleton height={200} />
                <Card.Body style={{ minHeight: '150px', height: '150px', overflow: 'hidden' }}>
                  <Skeleton height={20} width="80%" />
                  <Skeleton count={3} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: "50px" }}>
          <CustomPagination
            currentPage={currentPage}
            totalPages={1}
            onPageChange={() => {}}
          />
        </div>
      </Container>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!newsData || !newsData.length) {
    return <div>No Records Found!!</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalArticles);
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url} style={{ marginTop: '20px' }}>
            <Card>
              <Card.Img src={article.urlToImage ? article.urlToImage : Image} variant="top" />
              <Card.Body style={{ minHeight: '150px', height: '150px', overflow: 'hidden' }}>
                <Card.Title>{article.title}</Card.Title>
                {sliceTextIntoCards(article.description, 50).map((slice, index) => (
                  <p key={index} className="font">{slice}</p>
                ))}
              </Card.Body>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                <Card.Link href={article.url} target="_blank">Read More</Card.Link>
                <div>
                  <div>
                    {bookmarked[article.url] ? (
                      <span onClick={() => handleBookmark(article.url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                      </span>
                    ) : (
                      <span onClick={() => handleBookmark(article.url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: "50px" }}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </Container>
  );
};

export default NewsList;
