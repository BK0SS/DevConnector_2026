import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useParams } from 'react-router-dom';


const Post = ({ getPost, post: { post, loading }, match }) => {
  const { id } = useParams(); // Get ID from URL

  useEffect(() => {
    getPost(id); // Use the variable from the hook
  }, [getPost, id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        {/* Render post content here */}
        <h1>{post.text}</h1>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired 
};

// Added 'const' here
const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);