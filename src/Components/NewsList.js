import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";
import Image from '../assets/images/news.jpg'

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);


  function sliceTextIntoCards(text, maxLength) {
    const cards = [];
    let start = 0;

    while (start < text.length) {
      cards.push(text.slice(start, start + maxLength));
      start += maxLength;
    }

  }

  const handleBookmark = (value) => {
    console.log(value)
    setToggleBookmark(!toggleBookmark)
  }

  return (
    <Container>
      <Row>
        {!currentArticles.length ? <span>No Records Found!!</span> : currentArticles?.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url} style={{ marginTop: '20px' }}>
            <Card>
              <Card.Img src={article.urlToImage ? article.urlToImage : Image} variant="top" />
              <Card.Body style={{ minHeight: '150px', height: '150px', overflow: 'hidden' }}>
                <Card.Title>{article.title}</Card.Title>
                <p className="font"></p>{sliceTextIntoCards(JSON.stringify(article.description), 10)}
              </Card.Body>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                <Card.Link href={article.url} target="_blank">Read More</Card.Link>
                <div>
                  {
                    !toggleBookmark && <span onClick={handleBookmark(article)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                      </svg>
                    </span>
                  }
                  {
                    toggleBookmark && <span onClick={handleBookmark}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                      </svg>
                    </span>
                  }
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
          onPageChange={onPageChange}

        />
      </div>
    </Container>
  );
};

export default NewsList;
