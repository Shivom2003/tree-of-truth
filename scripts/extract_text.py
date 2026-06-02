import os
from pypdf import PdfReader

def extract_pdf_to_txt(pdf_path, txt_path):
    print(f"Extracting {pdf_path} to {txt_path}...")
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} does not exist!")
        return False
    
    try:
        reader = PdfReader(pdf_path)
        text = ""
        total_pages = len(reader.pages)
        for i, page in enumerate(reader.pages):
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
            if i % 100 == 0:
                print(f"  Processed {i}/{total_pages} pages...")
                
        os.makedirs(os.path.dirname(txt_path), exist_ok=True)
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Finished extracting. Saved to {txt_path}. Total size: {len(text)} chars.")
        return True
    except Exception as e:
        print(f"Failed to extract {pdf_path}: {e}")
        return False

# Directories
src_dir = r"C:\Users\SHIVOM\Downloads\Knowledge-corpus"
dest_dir = r"z:\Projects\Science-of-Truth\resources\corpus"

ignore_files = {
    "ASHTAVAKRA_GITA_Chinmayananda.pdf",
    "I-Am-That-by-Sri-Nisargadatta-Maharaj.pdf"
}

# Scan source directory for pdfs
import glob
for pdf_file in glob.glob(os.path.join(src_dir, "*.pdf")):
    filename = os.path.basename(pdf_file)
    if filename in ignore_files:
        print(f"Ignoring already extracted: {filename}")
        continue
        
    # Create output filename
    base_name = os.path.splitext(filename)[0]
    # Clean up name: lowercase, replace spaces and special chars with underscores
    clean_name = base_name.lower().replace(" ", "_").replace("-", "_").replace("(", "").replace(")", "")
    txt_filename = f"{clean_name}.txt"
    txt_path = os.path.join(dest_dir, txt_filename)
    
    extract_pdf_to_txt(pdf_file, txt_path)
