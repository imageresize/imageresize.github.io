from flask import Flask, render_template, request, send_file
   from PyPDF2 import PdfReader, PdfWriter
   import os

   app = Flask(__name__)

   @app.route('/')
   def index():
       return render_template('index.html')

   @app.route('/edit', methods=['POST'])
   def edit():
       file = request.files['file']
       password = request.form.get('password', '')

       try:
           reader = PdfReader(file)
           if reader.is_encrypted:
               if not password:
                   return "Password is required for this PDF.", 400
               reader.decrypt(password)

           writer = PdfWriter()
           for page in reader.pages:
               writer.add_page(page)

           edited_pdf_path = "static/edited_pdf.pdf"
           with open(edited_pdf_path, "wb") as output_pdf:
               writer.write(output_pdf)

           return render_template('edit.html', pdf_url=edited_pdf_path)
       except Exception as e:
           return f"Error: {str(e)}", 400

   @app.route('/download')
   def download():
       return send_file("static/edited_pdf.pdf", as_attachment=True)

   if __name__ == '__main__':
       app.run(debug=True)
