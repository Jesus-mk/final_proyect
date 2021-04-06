import React, {useState} from 'react';

function FileUploadPage({id, count, setCount, disable, setDisable}){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
	};
	
	

	const handleSubmission = () => {
        const formData = new FormData();
        formData.append('filename', selectedFile);
		
		fetch(`http://localhost:3000/employee/upload/?id=${id}`,{
				method: 'POST',
				body: formData,
            })
			.then((response) => response.json())
			.then((result) => {
				setDisable(true)
			})
			.catch((error) => {
				window.alert("Error al subir la imagen, pruebe con otro formato o tamaño");
				console.error('Error:', error);
			});
	};

	return(
   <div className="uploadImageComponent">
		<label for="file-upload" className="custom-file-upload" disabled={disable}>
			<i className="fa fa-cloud-upload" disabled={disable}></i> Seleccionar...
		</label>
		<input className="inputPhoto" id="file-upload" disabled={disable} type="file" name="filename" onChange={changeHandler}/>
		
		<div>
			<button disabled={disable} onClick={handleSubmission}>Actualizar Imagen</button>
		</div>
	</div>
	)
}

export default FileUploadPage;