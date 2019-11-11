import React from "react";
import GalleryImagePicker from "../GalleryImagePicker/GalleryImagePicker";
import ProductSelect from "../ProductSelect/ProductSelect";
import QuillEditor from "../QuillEditor/QuillEditor";

const EditProject = props => {
  return (
    <div className='row justify-content-center my-5'>
      <div className='col-md-12 text-center'>
        <h1 className='h3 mb-3 font-weight-normal'>
          Edit {props.project.name}
        </h1>
      </div>
      <div className='col-md-12'>
        <form>
          <div className='form-group row justify-content-between'>
            <label className='my-2 mx-3' htmlFor='name'>
              Name
            </label>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                id='name'
                defaultValue={props.project.name}
                ref={props.projectInput}
              />
            </div>
          </div>
          <div className='form-group row justify-content-between'>
            <label className='my-2 mx-3' htmlFor='description'>
              Description
            </label>
            <div className='col-sm-9'>
              <QuillEditor
                editorValue={props.getEditorValue}
                text={props.project.description}
              />
            </div>
          </div>
          <ProductSelect selectProducts={props.selectProducts} />
          <div className='form-group row justify-content-between'>
            <p className='my-2 mx-3'>Select Main Photos</p>
            <div className='col-sm-9'>
              <GalleryImagePicker
                selectedImages={props.selectedImages}
                photos={props.photos}
              />
            </div>
          </div>
          <div className='form-group row justify-content-between'>
            <label className='my-2 mx-3' htmlFor='description'>
              Short Description
            </label>
            <div className='col-sm-9'>
              <QuillEditor
                editorValue={props.getShDescValue}
                text={props.project.shortDescription}
              />
            </div>
          </div>
          <div className='form-group row justify-content-between'>
            <label className='my-2 mx-3' htmlFor='videos'>
              videos
            </label>
            <div className='col-sm-9'>
              <input
                className='form-control'
                type='text'
                id='videos'
                ref={props.videosInput}
                defaultValue={props.videos ? props.videos.map(v => v.src) : ""}
              />
            </div>
          </div>
          <div className='form-group row justify-content-end mt-5 mt-sm-0'>
            <div className='col-sm-9'>
              <button
                onClick={props.onConfirm}
                className='btn btn-lg btn-primary btn-block'
              >
                Submit!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
