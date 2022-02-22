import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './Star.css';
import StarCard from './StarCard';

const StarList = ({ updateStar, stars, setStars }) => {
  return (
    <div className="star-list-card">
      <div className="star-list">
        {stars?.length > 0 ? (
          stars.map((star) => <StarCard star={star} key={star.id} updateStar={updateStar} setStars={setStars} />)
        ) : (
          <div>There is no uploaded star</div>
        )}
      </div>
    </div>
  );
};

export default StarList;
