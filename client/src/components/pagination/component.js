import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  });
  
export default function UsePagination({setPage, pageNumber}) {
    const handleChange = (event, value) => {
        setPage(value);
      };
    const { items } = usePagination({
      count: pageNumber,
      onChange:handleChange,
      defaultPage:1,
      siblingCount:0,
       boundaryCount:1
    });
    return (
      <nav>
        <List>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = '…';
              } else if (type === 'page') {

                children = (
                    <button
                      type="button"
                      style={{
                        fontWeight: selected ? 'bold' : undefined,
                      }}
                      {...item}
                    >
                      {page}
                    </button>
                  );

            } else {
                children = (
                  <button type="button" {...item}>
                    {type}
                  </button>
                );
              }
            return <li key={index}>{children}</li>;
          })}
        </List>
      </nav>
    );
  }
  
