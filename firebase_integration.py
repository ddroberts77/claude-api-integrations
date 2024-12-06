import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase app
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def create_document(collection, data):
    doc_ref = db.collection(collection).add(data)
    return doc_ref[1].id

def read_document(collection, doc_id):
    doc_ref = db.collection(collection).document(doc_id)
    doc = doc_ref.get()
    return doc.to_dict() if doc.exists else None

def update_document(collection, doc_id, data):
    doc_ref = db.collection(collection).document(doc_id)
    doc_ref.update(data)

def delete_document(collection, doc_id):
    db.collection(collection).document(doc_id).delete()

# Example usage
if __name__ == "__main__":
    # Create
    new_doc_id = create_document("users", {"name": "John Doe", "age": 30})
    print(f"Created document with ID: {new_doc_id}")

    # Read
    user_data = read_document("users", new_doc_id)
    print(f"Read document: {user_data}")

    # Update
    update_document("users", new_doc_id, {"age": 31})
    updated_user = read_document("users", new_doc_id)
    print(f"Updated document: {updated_user}")

    # Delete
    delete_document("users", new_doc_id)
    deleted_user = read_document("users", new_doc_id)
    print(f"Deleted document: {deleted_user}")
