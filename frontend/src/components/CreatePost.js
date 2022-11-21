import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {auth, db} from "../services/firebase";
import Select from 'react-select';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow, MDBTextArea,
    MDBValidation,
} from "mdb-react-ui-kit";
import {setDoc, doc, collection, query, where, updateDoc, getDocs, arrayUnion} from "firebase/firestore";

const options = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
];

function CreatePost() {
    const [user, loading, error] = useAuthState(auth);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [created_on, setDate] = useState("");
    const [category, setCategory] = useState();
    const navigate = useNavigate();

    const uid = user.uid;   // use to link the post to user

    const makePost = async () => {
        if (!title || !body) {
            document.getElementById('form').reset();
            if (!title) {
                setTitle("");
            }
            if (!body) {
                setBody("")
            }
        }
         else {
                // add post to database
                let currentDate = new Date().toJSON().slice(0, 10);
                setDate(currentDate);
                const newPost = doc(collection(db, "post"));
                const data = {
                    uid: uid,
                    title: title,
                    body: body,
                    category: category,
                    created_on: created_on,
                    likes: 0
                }
                await setDoc(newPost, data);

                // link post to user using uid
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const querySnapshot = await getDocs(q);
                let docID = "";
                querySnapshot.forEach((doc) => {
                    docID = doc.id;
                });
                const userDoc = doc(db, "users", docID);
                await updateDoc(userDoc, {
                    posts: arrayUnion(newPost)
                });

            }
    }
    const handleChange = (options) => {
        setCategory(options);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol>
                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-5 text-center">Create Your Own Post</h2>

                            <MDBValidation className="row g-3" id="form">
                                <MDBRow>
                                    <MDBCol col='6'>
                                            <MDBInput
                                                wrapperClass='mb-4'
                                                label='Title'
                                                id='validationCustom01'
                                                required
                                                type='text'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <Select
                                            isMulti
                                            name="categories"
                                            options={options}
                                            closeMenuOnSelect={false}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            value = {category}
                                            onChange = {handleChange}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                    <MDBTextArea
                                        wrapperClass='mb-4'
                                        label='What is on your mind?'
                                        id='validationCustom03'
                                        required
                                        type='text'
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    />

                                <MDBBtn
                                    className='w-100 mb-4'
                                    size='md'
                                    onClick={makePost}
                                >
                                    Post
                                </MDBBtn>

                            </MDBValidation>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default CreatePost;