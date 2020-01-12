import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationTable = ({
  per_page,
  total_data,
  handleClick,
  current_page
}) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total_data / per_page); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={current_page <= 1}>
        <PaginationLink
          onClick={() => handleClick(current_page - 1)}
          previous
          href="#"/>
      </PaginationItem>

      {pageNumbers.map(i => (
        <PaginationItem key={i} active={current_page === i ? true : false}>
          <PaginationLink onClick={() => handleClick(i)} href="#">
            {i}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={current_page >= per_page - 1}>
        <PaginationLink
          onClick={() => handleClick(current_page + 1)}
          next
          href="#"
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationTable;
