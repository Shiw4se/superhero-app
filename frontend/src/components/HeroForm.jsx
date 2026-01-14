import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';

const HeroForm = ({ onClose, initialData }) => {
    const [nickname, setNickname] = useState('');
    const [realName, setRealName] = useState('');
    const [origin, setOrigin] = useState('');
    const [superpowers, setSuperpowers] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');

    const [uploadedImages, setUploadedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        if (initialData) {

            setNickname(initialData.nickname || '');
            setRealName(initialData.real_name || '');
            setOrigin(initialData.origin_description || '');
            setSuperpowers(initialData.superpowers || '');
            setCatchPhrase(initialData.catch_phrase || '');
            setUploadedImages(initialData.images || []);
        } else {
            setNickname('');
            setRealName('');
            setOrigin('');
            setSuperpowers('');
            setCatchPhrase('');
            setUploadedImages([]);
        }
        setNewImages([]);
    }, [initialData]);

    const setMainPhoto = (index) => {
        const copy = [...uploadedImages];
        const [selectedImage] = copy.splice(index, 1);
        copy.unshift(selectedImage);
        setUploadedImages(copy);
    };

    const removeImage = (index) => {
        const copy = [...uploadedImages];
        copy.splice(index, 1);
        setUploadedImages(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('real_name', realName);
        formData.append('origin_description', origin);
        formData.append('superpowers', superpowers);
        formData.append('catch_phrase', catchPhrase);
        formData.append('old_images', JSON.stringify(uploadedImages));

        for (let i = 0; i < newImages.length; i++) {
            formData.append('images', newImages[i]);
        }

        try {
            if (initialData) {
                await axios.put(`http://localhost:5000/api/heroes/${initialData._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Hero updated successfully! 🎉');
            } else {
                await axios.post('http://localhost:5000/api/heroes', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Hero created successfully! 🚀');
            }

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error(error);
            toast.error('An error occurred while saving. 😞');
        }
    };


    const handleDeleteHero = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/heroes/${initialData._id}`);


                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your hero has been deleted.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } catch (error) {
                    console.error(error);
                    toast.error('Error deleting hero');
                }
            }
        });
    };

    return (
        <div className="modal-content">
            <button onClick={onClose} className="btn-close">✖</button>

            <div className="form-column">
                <h2 style={{marginTop: 0, marginBottom: '20px'}}>{initialData ? 'Edit Hero' : 'New Hero'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nickname</label>
                        <input className="form-input" type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="e.g. Superman" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Real Name</label>
                        <input className="form-input" type="text" value={realName} onChange={e => setRealName(e.target.value)} placeholder="e.g. Clark Kent" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Origin Description</label>
                        <textarea className="form-textarea" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="How did they get their powers?" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Superpowers</label>
                        <input className="form-input" type="text" value={superpowers} onChange={e => setSuperpowers(e.target.value)} placeholder="e.g. Flight, Strength" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Catch Phrase</label>
                        <input className="form-input" type="text" value={catchPhrase} onChange={e => setCatchPhrase(e.target.value)} placeholder="e.g. Up, up and away!" />
                    </div>

                    <div style={{marginTop: '25px', display: 'flex', gap: '10px'}}>
                        <button type="submit" className="btn btn-primary" style={{flex: 1}}>Save</button>
                        {initialData && (
                            <button type="button" onClick={handleDeleteHero} className="btn btn-danger">Delete</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="gallery-column">
                <h3 style={{marginTop: 0}}>Gallery</h3>
                <p style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '15px'}}>Click ★ to set main photo.</p>

                <div className="gallery-grid">
                    {uploadedImages.map((img, index) => (
                        <div key={index} className={`gallery-item ${index === 0 ? 'main-photo' : ''}`}>
                            <img src={`http://localhost:5000/uploads/${img}`} alt="hero" className="gallery-img" />

                            {index !== 0 && (
                                <button type="button" onClick={() => setMainPhoto(index)} className="star-btn" title="Make Main">★</button>
                            )}
                            {index === 0 && (
                                <div className="star-btn" style={{background: '#fbbf24', color: 'black', cursor: 'default'}}>★</div>
                            )}

                            <button type="button" onClick={() => removeImage(index)} className="delete-img-btn">✖</button>
                        </div>
                    ))}
                </div>

                <div className="upload-box">
                    <label className="form-label" style={{cursor: 'pointer'}}>
                        📥 Add Images
                        <input type="file" multiple onChange={e => setNewImages(e.target.files)} style={{display: 'none'}} />
                    </label>
                    <div style={{fontSize: '0.8rem', color: '#6b7280', marginTop: '5px'}}>
                        {newImages.length > 0 ? `${newImages.length} files selected` : 'Drag & drop or click'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroForm;