// Home.js

import React, { useState } from 'react';

const Home = (prop) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    quality: '',
    durability: '',
    comments: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    setFeedback({ ...feedback, rating: newRating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send feedback data to your backend
        const backendResponse = await fetch('http://localhost:3001/submitFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedback),
        });
  
        if (backendResponse.ok) {
          // If the feedback is submitted to the backend successfully, setSubmitted to true
          console.log('Feedback submitted to the backend successfully!');
          setSubmitted(true);
        } else {
          console.error('Failed to submit feedback to the backend');
        }
      } catch (error) {
        console.error('Error submitting feedback to the backend:', error);
      }
    
    // You can send the feedback data to frill.co or handle it as needed.
    // For demonstration purposes, we'll just log it to the console.
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Welcome {prop.name}</h1>
      {submitted ? (
        <div>
          <p>Feedback submitted successfully!</p>
          {/* Display other feedback from frill.co here */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Rating:
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{ cursor: 'pointer', color: star <= feedback.rating ? 'gold' : 'grey' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </label>
          <br />
          <label>
            Quality:
            <input
              type="text"
              name="quality"
              value={feedback.quality}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Durability:
            <input
              type="text"
              name="durability"
              value={feedback.durability}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Comments:
            <textarea
              rows="4"
              cols="50"
              name="comments"
              value={feedback.comments}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default Home;
