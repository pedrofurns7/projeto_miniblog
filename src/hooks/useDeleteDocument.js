import { useState, useEffect, useReducer} from 'react'
import {db} from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'


const initialState = {
    loading: null,
    error: null
}

//utilizar para mapear esse action e verificar qual o status do inserção
const deleteReducer = (state, action) =>{

    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }   
}


export const useDeleteDocument = (docCollection) =>{

    const [response, dispatch] = useReducer(deleteReducer, initialState)

    //deal w/ memory leak

    const [cancelled, setCancelled] = useState(false)

    const checkCanceledBeforDispatch = (action) =>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async(id) =>{

        checkCanceledBeforDispatch({
            type: "LOADING"
        })

        try{
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
            
            checkCanceledBeforDispatch({
                type: "DELETEDD_DOC",
                payload: deletedDocument
            })

        } catch(error){
            checkCanceledBeforDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(() =>{
        return () => setCancelled(true)
    },[])

    return { deleteDocument, response}
}