# Mysoft Node.js & TypeScript SDK — Tam API ve Metod Referansı

Bu doküman, `swagger.json` içerisindeki **311 REST Endpoint** ve **315 Operasyonun** tamamını, Mysoft SDK içerisindeki servis sınıfı ve metod karşılıklarıyla birlikte listeler.

---

## 📌 İçindekiler

1. [Fatura İşlemleri (`client.invoices`)](#1-fatura-işlemleri-clientinvoices---79-metod) (79 Metod)
2. [İrsaliye İşlemleri (`client.despatches`)](#2-irsaliye-işlemleri-clientdespatches---78-metod) (78 Metod)
3. [Özel Belgeler & Makbuzlar (`client.vouchers`)](#3-özel-belgeler--makbuzlar-clientvouchers---40-metod) (40 Metod)
4. [Genel Kartlar & Tanımlar (`client.general`)](#4-genel-kartlar--tanımlar-clientgeneral---33-metod) (33 Metod)
5. [Firma & Kontör Bilgileri (`client.tenant`)](#5-firma--kontör-bilgileri-clienttenant---32-metod) (32 Metod)
6. [Mükellef Sorgulama (`client.taxpayers`)](#6-mükellef-sorgulama-clienttaxpayers---1-metod) (1 Metod)
7. [Ön Muhasebe Raporları (`client.accounting`)](#7-ön-muhasebe-raporları-clientaccounting---13-metod) (13 Metod)
8. [Defter İşlemleri (`client.books`)](#8-defter-işlemleri-clientbooks---11-metod) (11 Metod)
9. [Finans İşlemleri (`client.finance`)](#9-finans-işlemleri-clientfinance---5-metod) (5 Metod)
10. [İleti Yönetim Sistemi (`client.iys`)](#10-ileti-yönetim-sistemi-clientiys---15-metod) (15 Metod)
11. [Kampanya Yönetimi (`client.campaigns`)](#11-kampanya-yönetimi-clientcampaigns---5-metod) (5 Metod)
12. [Mutabakat İşlemleri (`client.reconciliation`)](#12-mutabakat-işlemleri-clientreconciliation---1-metod) (1 Metod)
13. [Sipariş İşlemleri (`client.orders`)](#13-sipariş-işlemleri-clientorders---1-metod) (1 Metod)
14. [Iframe Entegrasyonu (`client.iframe`)](#14-iframe-entegrasyonu-clientiframe---1-metod) (1 Metod)

---

## 1. BOOKS (`client.books` — 11 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getBookList()` | `GET` | `/api/Book/getBook` | Defter Listesi |
| `getBook()` | `POST` | `/api/Book/getBook` | Defter Listesi |
| `getBookPatentList()` | `GET` | `/api/Book/getBookPatent` | Berat Listesi |
| `getBookPatent()` | `POST` | `/api/Book/getBookPatent` | Berat Listesi |
| `bookReceiptReferenceList()` | `GET` | `/api/Book/getBookReceiptReference` | Yevmiye Defteri Belge Referans Listesi |
| `bookReceiptReference()` | `POST` | `/api/Book/getBookReceiptReference` | Yevmiye Defteri Belge Referans Listesi |
| `getBookXMLAsZip()` | `GET` | `/api/Book/getBookXMLAsZip` | Defter XML |
| `getBookPatentXMLAsZip()` | `GET` | `/api/Book/getBookPatentXMLAsZip` | Berat XML |
| `getBookTempPackage()` | `POST` | `/api/Book/getBookTempPackage` | Defter Dönemi Paket Numarası Alma |
| `createBookTempEntryHeader()` | `POST` | `/api/Book/createBookTempEntryHeader` | Defter Yevmiye Kaydı Oluşturma |
| `removeBookTempEntryHeader()` | `POST` | `/api/Book/removeBookTempEntryHeader` | Defter Yevmiye Kaydı Silme |

---

## 2. VOUCHERS (`client.vouchers` — 40 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `billDocumentOutbox()` | `POST` | `/api/BillDocument/billDocumentOutbox` | Adisyon Belgesi |
| `billDocumentOutboxWithUblXml()` | `POST` | `/api/BillDocument/billDocumentOutboxWithUblXml` | Adisyon Belgesi XML Gönderimi |
| `cancelBillDocumentOutbox()` | `GET` | `/api/BillDocument/cancelBillDocumentOutbox` | Adisyon Belgesi İptal |
| `getBillDocumentOutboxStatusChanged()` | `POST` | `/api/BillDocument/getBillDocumentOutboxStatusChanged` | Adisyon Belgesi Durum Değişenler |
| `getBillDocumentOutboxStatus()` | `GET` | `/api/BillDocument/getBillDocumentOutboxStatus` | Adisyon Durum Sorgu |
| `getBillDocumentOutboxPdfAsZip()` | `GET` | `/api/BillDocument/getBillDocumentOutboxPdfAsZip` | Adisyon PDF |
| `getBillDocumentOutboxXMLAsZip()` | `GET` | `/api/BillDocument/getBillDocumentOutboxXMLAsZip` | Adisyon XML |
| `getBillDocumentOutboxHTMLAsZip()` | `GET` | `/api/BillDocument/getBillDocumentOutboxHTMLAsZip` | Adisyon HTML |
| `getBillDocumentOutboxDraftPdfAsZip()` | `POST` | `/api/BillDocument/getBillDocumentOutboxDraftPdfAsZip` | Adisyon Önizleme - PDF |
| `getBillDocumentOutboxDraftHTMLAsZip()` | `POST` | `/api/BillDocument/getBillDocumentOutboxDraftHTMLAsZip` | Adisyon Önizleme - HTML |
| `getBillDocumentOutboxDraftXMLAsZip()` | `POST` | `/api/BillDocument/getBillDocumentOutboxDraftXMLAsZip` | Adisyon Önizleme - XML |
| `getBillDocumentOutboxWithHeaderInfoList()` | `POST` | `/api/BillDocument/getBillDocumentOutboxWithHeaderInfoList` | Adisyon Listesi |
| `bankReceiptOutbox()` | `POST` | `/api/BankReceipt/bankReceiptOutbox` | Dekont Belgesi |
| `cancelBankReceiptOutbox()` | `GET` | `/api/BankReceipt/cancelBankReceiptOutbox` | Dekont Belgesi İptal |
| `getBankReceiptOutboxXMLAsZip()` | `GET` | `/api/BankReceipt/getBankReceiptOutboxXMLAsZip` | Dekont XML |
| `getBankReceiptOutboxHTMLAsZip()` | `GET` | `/api/BankReceipt/getBankReceiptOutboxHTMLAsZip` | Dekont HTML |
| `getBankReceiptOutboxPdfAsZip()` | `GET` | `/api/BankReceipt/getBankReceiptOutboxPdfAsZip` | Dekont PDF |
| `foreignExchangeOutbox()` | `POST` | `/api/ForeignExchange/foreginExchangeOutbox` | Döviz/Kıymetli Maden Belgesi |
| `foreignExchangeOutboxWithUblXml()` | `POST` | `/api/ForeignExchange/foreignExchangeOutboxWithUblXml` | Döviz/Kıymetli Maden Belgesi XML Gönderimi |
| `cancelForeignExchangeOutbox()` | `GET` | `/api/ForeignExchange/cancelForeignExchangeOutbox` | Döviz/Kıymetli Maden Belgesi İptal |
| `getForeignExchangeOutboxStatusChanged()` | `POST` | `/api/ForeignExchange/getforeignExchangeOutboxStatusChanged` | Döviz/Kıymetli Maden Belgesi Durum Değişenler |
| `getForeignExchangeOutboxStatus()` | `GET` | `/api/ForeignExchange/getForeignExchangeOutboxStatus` | Döviz/Kıymetli Maden Belge Durum Sorgu |
| `getForeignExchangeOutboxPdfAsZip()` | `GET` | `/api/ForeignExchange/getForeignExchangeOutboxPdfAsZip` | Döviz/Kıymetli Maden Belge PDF |
| `getForeignExchangeOutboxXMLAsZip()` | `GET` | `/api/ForeignExchange/getForeignExchangeOutboxXMLAsZip` | Döviz/Kıymetli Maden Belge XML |
| `getForeignExchangeOutboxHTMLAsZip()` | `GET` | `/api/ForeignExchange/getForeignExchangeOutboxHTMLAsZip` | Döviz/Kıymetli Maden Belge HTML |
| `getForeignExchangeOutboxList()` | `POST` | `/api/ForeignExchange/getForeignExchangeOutboxList` | Döviz/Kıymetli Maden Belge Listesi |
| `getInvoiceOutboxWithHeaderInfoList()` | `POST` | `/api/ForeignExchange/getForeignExchangeOutboxWithHeaderInfoList` | Döviz/Kıymetli Maden Belge Listesi (Başlıklı) |
| `createForeignExchangeOutboxTestJson()` | `GET` | `/api/ForeignExchange/createForeignExchangeOutboxTestJson` | Döviz/Kıymetli Maden belgesi Ekleme Örnek JSON |
| `expenseVoucherOutbox()` | `POST` | `/api/ExpenseVoucher/expenseVoucherOutbox` | Gider Pusulası Belgesi |
| `expenseVoucherOutboxWithUblXml()` | `POST` | `/api/ExpenseVoucher/expenseVoucherOutboxWithUblXml` | Gider Pusulası Belgesi UBL XML Gönderimi |
| `cancelExpenseVoucherOutbox()` | `GET` | `/api/ExpenseVoucher/cancelExpenseVoucherOutbox` | Gider Pusulası Belgesi İptal |
| `getExpenseVoucherOutboxStatusChanged()` | `POST` | `/api/ExpenseVoucher/getExpenseVoucherOutboxStatusChanged` | Gider Pusulası Belgesi Durum Değişenler |
| `getExpenseVoucherOutboxStatus()` | `GET` | `/api/ExpenseVoucher/getExpenseVoucherOutboxStatus` | Gider Pusulası Durum Sorgu |
| `getExpenseVoucherOutboxPdfAsZip()` | `GET` | `/api/ExpenseVoucher/getExpenseVoucherOutboxPdfAsZip` | Gider Pusulası PDF |
| `getExpenseVoucherOutboxXMLAsZip()` | `GET` | `/api/ExpenseVoucher/getExpenseVoucherOutboxXMLAsZip` | Gider Pusulası XML |
| `getExpenseVoucherOutboxHTMLAsZip()` | `GET` | `/api/ExpenseVoucher/getExpenseVoucherOutboxHTMLAsZip` | Gider Pusulası HTML |
| `getExpenseVoucherOutboxDraftPdfAsZip()` | `POST` | `/api/ExpenseVoucher/getExpenseVoucherOutboxDraftPdfAsZip` | Gider Pusulası Önizleme - PDF |
| `getExpenseVoucherOutboxDraftHTMLAsZip()` | `POST` | `/api/ExpenseVoucher/getExpenseVoucherOutboxDraftHTMLAsZip` | Gider Pusulası Önizleme - HTML |
| `getExpenseVoucherOutboxDraftXMLAsZip()` | `POST` | `/api/ExpenseVoucher/getExpenseVoucherOutboxDraftXMLAsZip` | Gider Pusulası Önizleme - XML |
| `getExpenseVoucherOutboxWithHeaderInfoList()` | `POST` | `/api/ExpenseVoucher/getExpenseVoucherOutboxWithHeaderInfoList` | Gider Pusulası Listesi |

---

## 3. INVOICES (`client.invoices` — 79 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `invoiceDraft()` | `POST` | `/api/Invoice/invoiceDraft` | Portal Fatura Ekleme |
| `saveInvoiceDrugAndMedical()` | `POST` | `/api/Invoice/invoiceDrugAndMedical` | Fatura İlaç Tıbbi Cihaz Ekleme |
| `saveInvoiceNote()` | `POST` | `/api/Invoice/invoiceNote` | Fatura Not Ekleme |
| `invoiceDraftNew()` | `POST` | `/api/Invoice/invoiceDraftNew` | Portal Fatura Ekleme(Yeni) |
| `deleteInvoiceDraft()` | `POST` | `/api/Invoice/deleteInvoiceDraft` | Taslak Fatura Sil |
| `invoiceDraftSignAndSend()` | `GET` | `/api/Invoice/invoiceDraftSignAndSend` | Taslak Fatura İmzala Gönder |
| `getInvoiceModel()` | `GET` | `/api/Invoice/getInvoiceModel` | Fatura Model |
| `getInvoiceResultModelList()` | `POST` | `/api/Invoice/getInvoiceModelList` | Fatura Model Liste |
| `getInvoiceWithHeaderInfoList()` | `POST` | `/api/Invoice/getInvoiceWithHeaderInfoList` | Fatura Listesi (Başlıklı) |
| `getInvoiceDraftPdfAsZip()` | `GET` | `/api/Invoice/getInvoiceDraftPdfAsZip` | Taslak Fatura PDF |
| `createInvoiceDraftTestJson()` | `GET` | `/api/Invoice/createInvoiceDraftTestJson` | Fatura Ekleme Örnek JSON |
| `invoiceDraftSendToGib()` | `POST` | `/api/Invoice/invoiceDraftSendToGib` | GİB Portal'a Fatura Gönderme |
| `invoiceDraftSendToGibUblXml()` | `POST` | `/api/Invoice/invoiceDraftSendToGibUblXml` | GİB Portal'a Fatura Gönderme XML |
| `invoiceDraftReSendToGib()` | `POST` | `/api/Invoice/invoiceDraftReSendToGib` | GİB Portal'a Fatura Gönderme (Tekrar) |
| `requestSmsConfimCodeFromGib()` | `POST` | `/api/Invoice/requestSmsConfimCodeFromGib` | GİB Portal'a Sms Onay Kodu Talebi Oluşturma |
| `sendSmsConfirmForInvoiceToGib()` | `POST` | `/api/Invoice/sendSmsConfirmForInvoiceToGib` | GİB Portal'a SMS Onay Kodu ile Birlikte Fatura İmza Onayı Gönderme |
| `removeInvoiceFromGib()` | `POST` | `/api/Invoice/removeInvoiceFromGib` | GİB Portal'dan Onaylanmamış Faturayı Silme |
| `createCancellationRequestToGib()` | `POST` | `/api/Invoice/createCancellationRequestToGib` | GİB Portal'da Onaylanmış Fatura İçin İptal Talebi Oluşturma |
| `getNewEArchiveDocumentInboxList()` | `POST` | `/api/EArchiveDocumentInbox/getNewEArchiveDocumentInboxList` | Yeni Gelen E-Arşiv Fatura Listesi |
| `getEArchiveDocumentInboxList()` | `POST` | `/api/EArchiveDocumentInbox/getEArchiveDocumentInboxList` | Gelen E-Arşiv Fatura Listesi |
| `eArchiveDocumentInboxSavedByCustomer()` | `GET` | `/api/EArchiveDocumentInbox/eArchiveDocumentInboxSavedByCustomer` | Gelen E_arşiv Fatura Alındı |
| `getEArchiveDocumentInboxUBLXMLAsZip()` | `GET` | `/api/EArchiveDocumentInbox/getEArchiveDocumentInboxUBLXMLAsZip` | Gelen E-Arşiv Fatura XML |
| `getEArchiveDocumentInboxPdfAsZip()` | `GET` | `/api/EArchiveDocumentInbox/getEArchiveDocumentInboxPdfAsZip` | Gelen E-Arşiv Fatura PDF |
| `getNewInvoiceInboxList()` | `POST` | `/api/InvoiceInbox/getNewInvoiceInboxList` | Yeni Gelen Fatura Listesi |
| `getNewInvoiceInboxWithHeaderInfoList()` | `POST` | `/api/InvoiceInbox/getNewInvoiceInboxWithHeaderInfoList` | Yeni Gelen Fatura Listesi (Başlıklı) |
| `getInvoiceInboxListForPeriod()` | `POST` | `/api/InvoiceInbox/getInvoiceInboxListForPeriod` | Gelen Fatura Listesi |
| `getInvoiceInboxWithHeaderInfoListForPeriod()` | `POST` | `/api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriod` | Gelen Fatura Listesi (Başlıklı) |
| `getInvoiceInboxWithHeaderInfoListForPeriodPaging()` | `POST` | `/api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriodPaging` | Gelen Fatura Listesi (Başlıklı)(Sayfalama) |
| `getInvoiceInboxPdfAsZip()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxPdfAsZip` | Gelen Fatura PDF |
| `getMultipleInvoiceInboxAsOnePdfAsZip()` | `GET` | `/api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZip` | Gelen Fatura PDF (Çoklu) |
| `getMultipleInvoiceInboxAsOnePdfAsZipWithPost()` | `POST` | `/api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZipWithPost` | Gelen Fatura PDF (Çoklu)(POST) |
| `getInvoiceInboxUBLXMLAsZip()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxUBLXMLAsZip` | Gelen Fatura XML |
| `getInvoiceInboxUBLXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxUBLXMLWithEnvelopeInfoAsZip` | Gelen Fatura XML Ve Zarf |
| `getInvoiceInboxHTMLAsZip()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxHTMLAsZip` | Gelen Fatura HTML |
| `getInvoiceInboxModel()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxModel` | Gelen Fatura Model |
| `getInvoiceInboxWithEnvelopeModel()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxWithEnvelopeModel` | Gelen Fatura Model(Zarf) |
| `getInvoiceInboxStatus()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxStatus` | Gelen Fatura Durum Sorgu |
| `invoiceInboxSavedByCustomer()` | `GET` | `/api/InvoiceInbox/invoiceInboxSavedByCustomer` | Gelen Fatura Alındı |
| `updateInvoiceInboxArchiveStatus()` | `GET` | `/api/InvoiceInbox/updateInvoiceInboxArchiveStatus` | Gelen Fatura Arşiv Durumu Güncelle |
| `invoiceInboxIncreasePrintCount()` | `GET` | `/api/InvoiceInbox/invoiceInboxIncreasePrintCount` | Gelen Fatura Yazdırıldı |
| `acceptInvoice()` | `GET` | `/api/InvoiceInbox/acceptInvoice` | Gelen Fatura Kabul |
| `denyInvoice()` | `GET` | `/api/InvoiceInbox/denyInvoice` | Gelen Fatura Red |
| `denyInvoiceWithModel()` | `POST` | `/api/InvoiceInbox/denyInvoiceWithModel` | Gelen Fatura Red (Model) |
| `getEArchiveInboxForPeriodList()` | `POST` | `/api/InvoiceInbox/getEArchiveInboxForPeriodList` | 5000/30000 Listesi |
| `eArchiveInboxSavedByCustomer()` | `GET` | `/api/InvoiceInbox/earchiveInboxSavedByCustomer` | 5000/30000 Fatura Alındı |
| `getInvoiceInboxUBLXMLAsZipTepeBilisim()` | `GET` | `/api/InvoiceInbox/getInvoiceInboxUBLXMLAsZipTepeBilisim` | Gelen Fatura XML - Tepe Bilişim |
| `invoiceOutbox()` | `POST` | `/api/InvoiceOutbox/invoiceOutbox` | Giden Fatura Ekleme |
| `invoiceOutboxWithUblXml()` | `POST` | `/api/InvoiceOutbox/invoiceOutboxWithUblXml` | Giden Fatura XML Gönderimi |
| `sendDraftInvoiceToGIB()` | `POST` | `/api/InvoiceOutbox/sendDraftInvoiceToGIB` | Taslak Giden Faturayı Gönder |
| `deleteDraftInvoiceOutbox()` | `GET` | `/api/InvoiceOutbox/deleteDraftInvoiceOutbox` | Taslak Giden Fatura Silme |
| `cancelEArchiveInvoice()` | `GET` | `/api/InvoiceOutbox/cancelEArchiveInvoice` | Giden Arşiv Fatura İptal |
| `getInvoiceOutboxStatusChanged()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxStatusChanged` | Giden Fatura Durum Değişenler |
| `getInvoiceOutboxStatus()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxStatus` | Giden Fatura Durum Sorgu |
| `getInvoiceOutboxPdfAsZip()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxPdfAsZip` | Giden Fatura PDF |
| `getMultipleInvoiceOutboxAsOnePdfAsZip()` | `GET` | `/api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZip` | Giden Fatura PDF (Çoklu) |
| `getMultipleInvoiceOutboxAsOnePdfAsZipWithPost()` | `POST` | `/api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZipWithPost` | Giden Fatura PDF (Çoklu)(POST) |
| `getInvoiceOutboxXMLAsZip()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxXMLAsZip` | Giden Fatura XML |
| `getInvoiceOutboxEnvelopeXMLAsZip()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxEnvelopeXMLAsZip` | Giden Fatura Zarf XML |
| `getInvoiceOutboxXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxXMLWithEnvelopeInfoAsZip` | Giden Fatura XML ve Zarf |
| `getInvoiceOutboxHTMLAsZip()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxHTMLAsZip` | Giden Fatura HTML |
| `getInvoiceOutboxModel()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxModel` | Giden Fatura Model |
| `getInvoiceOutboxDraftPdfAsZip()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxDraftPdfAsZip` | Fatura Önizleme - PDF |
| `getInvoiceOutboxDraftHTMLAsZip()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxDraftHTMLAsZip` | Fatura Önizleme - HTML |
| `getInvoiceOutboxDraftXMLAsZip()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxDraftXMLAsZip` | Fatura Önizleme - XML |
| `getInvoiceOutboxForUblXmlDraftPdfAsZip()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftPdfAsZip` | Fatura Önizleme XML - PDF |
| `getInvoiceOutboxForUblXmlDraftHTMLAsZip()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftHTMLAsZip` | Fatura Önizleme XML - HTML |
| `getInvoiceOutboxList()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxList` | Giden Fatura Listesi |
| `getInvoiceOutboxWithHeaderInfoList()` | `POST` | `/api/InvoiceOutbox/getInvoiceOutboxWithHeaderInfoList` | Giden Fatura Listesi (Başlıklı) |
| `sendMailForInvoice()` | `GET` | `/api/InvoiceOutbox/sendMailForInvoice` | Faturayı Mail At |
| `checkMailStatusForInvoice()` | `GET` | `/api/InvoiceOutbox/checkMailStatusForInvoice` | Fatura Mail Kontrol Detay |
| `checkGeneralMailStatusForInvoice()` | `GET` | `/api/InvoiceOutbox/checkGeneralMailStatusForInvoice` | Fatura Mail Durum Kontrol |
| `checkGeneralMailStatusForMultipleInvoice()` | `POST` | `/api/InvoiceOutbox/checkGeneralMailStatusForMultipleInvoice` | Çoklu Fatura Mail Durum Kontrol |
| `getInvoiceOutboxPublicUrl()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxPublicUrl` | Fatura URL |
| `checkSchemaSchematronForInvoiceUBL()` | `POST` | `/api/InvoiceOutbox/checkSchemaSchematronForInvoiceUBL` | Giden Fatura XML Schema Kontrol |
| `invoiceOutboxTepeBilisim()` | `POST` | `/api/InvoiceOutbox/invoiceOutboxTepeBilisim` | Giden Fatura Ekleme - Tepe Bilişim |
| `getInvoiceOutboxXMLAsZipTepeBilisim()` | `GET` | `/api/InvoiceOutbox/getInvoiceOutboxXMLAsZipTepeBilisim` | Giden Fatura XML - Tepe Bilişim |
| `invoiceOutboxNetleBelge()` | `POST` | `/api/InvoiceOutbox/invoiceOutboxNetleBelge` | Giden Fatura Ekleme - NetleBelge |
| `invoiceFromSoftNetExcel()` | `POST` | `/api/InvoiceOutbox/invoiceFromSoftNetExcel` | Excelden Fatura - SoftNet |
| `createInvoiceOutboxTestJson()` | `GET` | `/api/InvoiceOutbox/createInvoiceOutboxTestJson` | Giden Fatura Ekleme Örnek JSON |

---

## 4. FINANCE (`client.finance` — 5 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `createFinanceReceipt()` | `POST` | `/api/Finance/createFinanceReceipt` | Portal Finans Fişi Ekleme |
| `financeDetailedList()` | `GET` | `/api/Finance/financeDetailedList` | Detaylı Finans Listesi |
| `createAccountReceipt()` | `POST` | `/api/Finance/createAccountReceipt` | Portal  Muhasebe Fişi Ekleme |
| `getBankTransactionList()` | `POST` | `/api/Finance/getBankTransactionList` | Banka Hareket Listesi |
| `bankTransactionSavedByCustomer()` | `POST` | `/api/Finance/bankTransactionSavedByCustomer` | Banka Hareketi Alındı |

---

## 5. TENANT (`client.tenant` — 32 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getTenant()` | `GET` | `/api/Tenant/getTenant` | Firma Listesi |
| `getTenantWithIdentifier()` | `GET` | `/api/Tenant/getTenantWithIdentifier` | Firma Sorgu |
| `getTenantInfo()` | `GET` | `/api/Tenant/getTenantInfo` | Firma Bilgi |
| `getTenantNaceList()` | `GET` | `/api/Tenant/getTenantNaceList` | Firma Nace Kdv Oranları |
| `updateTenantAddressInfo()` | `POST` | `/api/Tenant/UpdateTenantAddressInfo` | Firma Adres Güncelle |
| `addTenant()` | `POST` | `/api/Tenant/addTenant` | Firma Ekleme |
| `addTenantPreContract()` | `POST` | `/api/Tenant/addTenantPreContract` | Firma Sözleşme Ekleme |
| `getTenantPreContract()` | `GET` | `/api/Tenant/getTenantPreContract` | Firma Sözleşme Listesi |
| `getTenantActivation()` | `GET` | `/api/Tenant/getTenantActivation` | Firma Aktivasyon Listesi |
| `addTenantActivation()` | `POST` | `/api/Tenant/addTenantActivation` | Firma Aktivasyon Ekleme |
| `addVuk507Activation()` | `POST` | `/api/Tenant/addVuk507Activation` | Firma VUK 507 Aktivasyon Ekleme |
| `addTenantUser()` | `POST` | `/api/Tenant/addTenantUser` | Firma Kullanıcı Ekleme |
| `addTenantSmtpSettings()` | `POST` | `/api/Tenant/addTenantSmtpSettings` | Firma SMTP Ayar Ekle |
| `addTenantPublicIntegration()` | `POST` | `/api/Tenant/addTenantPublicIntegration` | Firma Kamu Entegrasyon Ekle |
| `addTenantXslt()` | `POST` | `/api/Tenant/addTenantXslt` | Firma Dizayn Ekle |
| `addTenantStamp()` | `POST` | `/api/Tenant/addTenantStamp` | Firma Kaşe Ekleme |
| `addTenantLogo()` | `POST` | `/api/Tenant/addTenantLogo` | Firma Logo Ekleme |
| `addDocumentNumber()` | `POST` | `/api/Tenant/addDocumentNumber` | Firma Numaratör Ekleme |
| `getDocumentNumberList()` | `GET` | `/api/Tenant/getDocumentNumberList` | Firma Numaratör Listesi |
| `getNumaratorSetList()` | `GET` | `/api/Tenant/getNumaratorSetList` | Firma Numaratör Set Listesi |
| `getTenantXslt()` | `POST` | `/api/Tenant/getTenantXslt` | Firma Dizayn Sorgula |
| `getXsltPreviewHtml()` | `POST` | `/api/Tenant/getXsltPreviewHtml` | Dizayn Önizleme HTML |
| `getXsltPreviewPdf()` | `POST` | `/api/Tenant/getXsltPreviewPdf` | Dizayn Önizleme PDF |
| `addTenantNotificationSettings()` | `POST` | `/api/Tenant/addTenantNotificationSettings` | Firma Bildirim Tipi Ekle |
| `removeTenantNotificationSettings()` | `POST` | `/api/Tenant/removeTenantNotificationSettings` | Firma Bildirim Tipi Kaldır |
| `getCreditInfo()` | `POST` | `/api/Tenant/getCreditInfo` | Firma Kontör Bilgisi |
| `getBusinessPartnerTariff()` | `GET` | `/api/Tenant/getBusinessPartnerTariff` | İş Ortağı Tarife Listesi |
| `insertDocumentCredit()` | `POST` | `/api/Tenant/insertDocumentCredit` | Firma Kontör Yükleme |
| `getCounterInfo()` | `POST` | `/api/Tenant/getCounterInfo` | Firma Sayaç Bilgisi |
| `getBusinessPartnerDocumentCreditList()` | `POST` | `/api/Tenant/getBusinessPartnerDocumentCreditList` | İş ortağı kontör özet bilgisi |
| `getMonthlyCreditConsumption()` | `POST` | `/api/Tenant/getMonthlyCreditConsumption` | Firma Aylık Kontör Bilgisi |
| `getBusinessPartnerTenantDocumentUsageSummary()` | `GET` | `/api/Tenant/getBusinessPartnerTenantDocumentUsageSummary` | Firma Kontör Kullanım Özeti |

---

## 6. DESPATCHES (`client.despatches` — 78 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getNewDespatchInboxList()` | `POST` | `/api/DespatchInbox/getNewDespatchInboxList` | Yeni Gelen İrsaliye Listesi |
| `getNewDespatchInboxWithHeaderInfoList()` | `POST` | `/api/DespatchInbox/getNewDespatchInboxWithHeaderInfoList` | Yeni Gelen İrsaliye Listesi (Başlıklı) |
| `getDespatchInboxStatus()` | `GET` | `/api/DespatchInbox/getDespatchInboxStatus` | Gelen İrsaliye Durumu |
| `getDespatchInboxListForPeriod()` | `POST` | `/api/DespatchInbox/getDespatchInboxListForPeriod` | Gelen İrsaliye Listesi |
| `getDespatchInboxWithHeaderInfoListForPeriod()` | `POST` | `/api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriod` | Gelen İrsaliye Listesi (Başlıklı) |
| `getDespatchInboxWithHeaderInfoListForPeriodPaging()` | `POST` | `/api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriodPaging` | Gelen İrsaliye Listesi (Başlıklı)(Sayfalama) |
| `getDespatchInboxPdfAsZip()` | `GET` | `/api/DespatchInbox/getDespatchInboxPdfAsZip` | Gelen İrsaliye PDF |
| `getMultipleDespatchInboxAsOnePdfAsZipWithPost()` | `POST` | `/api/DespatchInbox/getMultipleDespatchInboxAsOnePdfAsZipWithPost` | Gelen İrsaliye PDF (Çoklu)(POST) |
| `getDespatchInboxUBLXMLAsZip()` | `GET` | `/api/DespatchInbox/getDespatchInboxUBLXMLAsZip` | Gelen İrsaliye XML |
| `getDespatchInboxUBLXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/DespatchInbox/getDespatchInboxUBLXMLWithEnvelopeInfoAsZip` | Gelen İrsaliye XML ve Zarf |
| `getDespatchInboxHTMLAsZip()` | `GET` | `/api/DespatchInbox/getDespatchInboxHTMLAsZip` | Gelen İrsaliye HTML |
| `getDespatchInboxModel()` | `GET` | `/api/DespatchInbox/getDespatchInboxModel` | Gelen İrsaliye Model |
| `despatchInboxSavedByCustomer()` | `GET` | `/api/DespatchInbox/despatchInboxSavedByCustomer` | Gelen İrsaliye Alındı |
| `updateInvoiceInboxArchiveStatus()` | `GET` | `/api/DespatchInbox/updateDespatchInboxArchiveStatus` | Gelen İrsaliye Arşiv Durumu Güncelle |
| `getDespatchInboxUBLXMLAsZipTepeBilisim()` | `GET` | `/api/DespatchInbox/getDespatchInboxUBLXMLAsZipTepeBilisim` | Gelen İrsaliye XML - Tepe Bilişim |
| `getNewReceiptInboxList()` | `POST` | `/api/ReceiptInbox/getNewReceiptInboxList` | Yeni Gelen İrsaliye Yanıt Listesi |
| `getNewReceiptInboxWithHeaderInfoList()` | `POST` | `/api/ReceiptInbox/getNewReceiptInboxWithHeaderInfoList` | Yeni Gelen İrsaliye Yanıt Listesi (Başlıklı) |
| `getReceiptInboxListForPeriod()` | `POST` | `/api/ReceiptInbox/getReceiptInboxListForPeriod` | Gelen İrsaliye Yanıt Listesi |
| `getReceiptInboxWithHeaderInfoListForPeriod()` | `POST` | `/api/ReceiptInbox/getReceiptInboxWithHeaderInfoListForPeriod` | Gelen İrsaliye Yanıt Listesi (Başlıklı) |
| `getReceiptInboxPdfAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxPdfAsZip` | Gelen İrsaliye Yanıt PDF |
| `getReceiptInboxUBLXMLAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxUBLXMLAsZip` | Gelen İrsaliye Yanıt XML |
| `getReceiptInboxHTMLAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxHTMLAsZip` | Gelen İrsaliye Yanıt HTML |
| `getReceiptInboxByDespatchETTNPdfAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxByDespatchETTNPdfAsZip` | Gelen İrsaliye Yanıt PDF(İrsaliye ETTN) |
| `getReceiptInboxUBLXMLByDespatchETTNAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxUBLXMLByDespatchETTNAsZip` | Gelen İrsaliye Yanıt XML(İrsaliye ETTN) |
| `getReceiptInboxHTMLByDespatchETTNAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxHTMLByDespatchETTNAsZip` | Gelen İrsaliye Yanıt HTML(İrsaliye ETTN) |
| `getDespatchInboxUBLXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/ReceiptInbox/getReceiptInboxUBLXMLWithEnvelopeInfoAsZip` | Gelen İrsaliye Yanıt XML ve Zarf |
| `receiptInboxSavedByCustomer()` | `GET` | `/api/ReceiptInbox/receiptInboxSavedByCustomer` | Gelen İrsaliye Yanıtı Alındı |
| `getReceiptInboxUBLXMLAsZipTepeBilisim()` | `GET` | `/api/ReceiptInbox/getReceiptInboxUBLXMLAsZipTepeBilisim` | Gelen İrsaliye Yanıt XML - Tepe Bilişim |
| `despatchOutbox()` | `POST` | `/api/DespatchOutbox/despatchOutbox` | Giden İrsaliye Ekleme |
| `despatchOutboxWithUblXml()` | `POST` | `/api/DespatchOutbox/despatchOutboxWithUblXml` | Giden İrsaliye Gönderimi XML |
| `sendDraftDespatchToGIB()` | `POST` | `/api/DespatchOutbox/sendDraftDespatchToGIB` | Taslak Giden İrsaliye Gönder |
| `deleteDraftDespatchOutbox()` | `GET` | `/api/DespatchOutbox/deleteDraftDespatchOutbox` | Taslak Giden İrsaliye Silme |
| `getDespatchOutboxStatusChanged()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxStatusChanged` | Giden İrsaliye Değişenler |
| `getDespatchOutboxStatus()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxStatus` | Giden İrsaliye Durumu |
| `getDespatchOutboxPdfAsZip()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxPdfAsZip` | Giden İrsaliye PDF |
| `getMultipleDespatchOutboxAsOnePdfAsZip()` | `GET` | `/api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZip` | Giden İrsaliye PDF (Çoklu) |
| `getMultipleDespatchOutboxAsOnePdfAsZipPost()` | `POST` | `/api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZipPost` | Giden İrsaliye PDF (Çoklu)(POST) |
| `getDespatchOutboxXMLAsZip()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxXMLAsZip` | Giden İrsaliye XML |
| `getDespatchOutboxEnvelopeXMLAsZip()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxEnvelopeXMLAsZip` | Giden İrsaliye Zarf XML |
| `getDespatchOutboxXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxXMLWithEnvelopeInfoAsZip` | Giden İrsaliye XML ve Zarf |
| `getDespatchOutboxHTMLAsZip()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxHTMLAsZip` | Giden İrsaliye HTML |
| `getDespatchOutboxDraftPdfAsZip()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxDraftPdfAsZip` | İrsaliye Önizleme - PDF |
| `getDespatchOutboxDraftHTMLAsZip()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxDraftHTMLAsZip` | İrsaliye Önizleme - HTML |
| `getDespatchOutboxDraftXMLAsZip()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxDraftXMLAsZip` | İrsaliye Önizleme - XML |
| `getDespatchOutboxForUblXmlDraftPdfAsZip()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxForUblXmlDraftPdfAsZip` | İrsaliye Önizleme XML - PDF |
| `getDespatchOutboxForUblXmlDraftHTMLAsZip()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxForUblXmlDraftHTMLAsZip` | İrsaliye Önizleme XML - HTML |
| `getDespatchOutboxList()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxList` | Giden İrsaliye Listesi |
| `getDespatchOutboxWithHeaderInfoList()` | `POST` | `/api/DespatchOutbox/getDespatchOutboxWithHeaderInfoList` | Giden İrsaliye Listesi (Başlıklı) |
| `checkSchemaSchematronForDespatchUBL()` | `POST` | `/api/DespatchOutbox/checkSchemaSchematronForDespatchUBL` | Giden İrsaliye XML Schema Kontrol |
| `despatchOutboxTepeBilisim()` | `POST` | `/api/DespatchOutbox/despatchOutboxTepeBilisim` | Giden İrsaliye Gönderimi XML - Tepe Bilisim |
| `getDespatchOutboxXMLAsZipTepeBilisim()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxXMLAsZipTepeBilisim` | Giden İrsaliye XML - Tepe Bilisim |
| `getDespatchOutboxPublicUrl()` | `GET` | `/api/DespatchOutbox/getDespatchOutboxPublicUrl` | İrsaliye URL |
| `despatchOutboxNetleBelge()` | `POST` | `/api/DespatchOutbox/despatchOutboxNetleBelge` | Giden İrsaliye Ekleme - NetleBelge |
| `createDespatchOutboxTestJson()` | `GET` | `/api/DespatchOutbox/createDespatchOutboxTestJson` | Giden İrsaliye Ekleme Örnek JSON |
| `receiptOutbox()` | `POST` | `/api/ReceiptOutbox/receiptOutbox` | Giden İrsaliye Yanıt Ekleme |
| `receiptOutboxWithUblXml()` | `POST` | `/api/ReceiptOutbox/receiptOutboxWithUblXml` | Giden İrsaliye Yanıtı XML Gönderimi |
| `getReceiptOutboxStatusChanged()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxStatusChanged` | Giden İrsaliye Yanıtı Değişenler |
| `getReceiptOutboxStatus()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxStatus` | Giden İrsaliye Yanıt Durumu |
| `getReceiptOutboxPdfAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxPdfAsZip` | Giden İrsaliye Yanıtı PDF |
| `getReceiptOutboxWithDespatchEttnPdfAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxWithDespatchEttnPdfAsZip` | Giden İrsaliye Yanıtı PDF - İrsaliye ETTN |
| `getReceiptOutboxXMLAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxXMLAsZip` | Giden İrsaliye Yanıtı XML |
| `getReceiptOutboxEnvelopeXMLAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxEnvelopeXMLAsZip` | Giden İrsaliye Yanıtı Zarf XML |
| `getReceiptOutboxWithDespatchETTNXMLAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNXMLAsZip` | Giden İrsaliye Yanıtı XML - İrsaliye ETTN |
| `getReceiptOutboxHTMLAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxHTMLAsZip` | Giden İrsaliye Yanıt HTML |
| `getReceiptOutboxWithDespatchETTNHTMLAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNHTMLAsZip` | Giden İrsaliye Yanıt HTML - İrsaliye ETTN |
| `getReceiptOutboxXMLWithEnvelopeInfoAsZip()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxXMLWithEnvelopeInfoAsZip` | Giden İrsaliye Yanıtı XML ve Zarf |
| `getReceiptOutboxDraftPdfAsZip()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxDraftPdfAsZip` | İrsaliye Yanıt Önizleme - PDF |
| `getReceiptOutboxDraftHTMLAsZip()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxDraftHTMLAsZip` | İrsaliye Yanıt Önizleme - HTML |
| `getReceiptOutboxForUblXmlDraftPdfAsZip()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftPdfAsZip` | İrsaliye Yanıt Önizleme XML - PDF |
| `getReceiptOutboxForUblXmlDraftHTMLAsZip()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftHTMLAsZip` | İrsaliye Yanıt Önizleme XML - HTML |
| `getReceiptOutboxList()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxList` | Giden İrsaliye Yanıt Listesi |
| `getReceiptOutboxWithHeaderInfoList()` | `POST` | `/api/ReceiptOutbox/getReceiptOutboxWithHeaderInfoList` | Giden İrsaliye Yanıt Listesi (Başlıklı) |
| `receiptOutboxTepeBilisim()` | `POST` | `/api/ReceiptOutbox/receiptOutboxTepeBilisim` | Giden İrsaliye Yanıtı XML - Tepe Bilişim |
| `getReceiptOutboxXMLAsZipTepeBilisim()` | `GET` | `/api/ReceiptOutbox/getReceiptOutboxXMLAsZipTepeBilisim` | Giden İrsaliye Yanıtı XML - Tepe Bilişim |
| `createReceiptOutboxTestJson()` | `GET` | `/api/ReceiptOutbox/createReceiptOutboxTestJson` | Giden İrsaliye Yanıt Ekleme Örnek JSON |
| `despatchDraft()` | `POST` | `/api/Despatch/despatchDraft` | Portal İrsaliye Ekleme |
| `createDespatchTestJson()` | `GET` | `/api/Despatch/createDespatchTestJson` | İrsaliye Ekleme Örnek JSON |
| `getDespatchModelList()` | `POST` | `/api/Despatch/getDespatchModelList` | İrsaliye Model Liste |

---

## 7. GENERAL (`client.general` — 33 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `country()` | `GET` | `/api/GeneralCard/country` | Ülke Bilgileri |
| `city()` | `GET` | `/api/GeneralCard/city` | Şehir Bilgileri |
| `unit()` | `GET` | `/api/GeneralCard/unit` | Birim Bilgileri |
| `currency()` | `GET` | `/api/GeneralCard/currency` | Para Birimi Bilgileri |
| `taxOffice()` | `GET` | `/api/GeneralCard/taxOffice` | Vergi Dairesi Bilgileri |
| `account()` | `POST` | `/api/GeneralCard/account` | Müşteri / Tedarikçi Ekleme |
| `accountList()` | `POST` | `/api/GeneralCard/accountList` | Müşteri / Tedarikçi Bilgileri |
| `warehouse()` | `POST` | `/api/GeneralCard/warehouse` | Depo Ekleme |
| `warehouseList()` | `POST` | `/api/GeneralCard/warehouseList` | Depo Bilgileri |
| `product()` | `POST` | `/api/GeneralCard/product` | Stok Ekleme |
| `productTransactionList()` | `POST` | `/api/GeneralCard/productTransactionList` | Stok Hareketleri Listesi |
| `productList()` | `POST` | `/api/GeneralCard/productList` | Stok Bilgileri |
| `productUnit()` | `POST` | `/api/GeneralCard/productUnit` | Stok Birim Çevrimi Ekleme |
| `productBarcode()` | `POST` | `/api/GeneralCard/productBarcode` | Stok Barkod Ekleme |
| `warehouseProductList()` | `POST` | `/api/GeneralCard/warehouseProductList` | Depo Stok Bilgileri |
| `categoryGroup()` | `POST` | `/api/GeneralCard/categoryGroup` | Belge Sınıfı / Grup Ekleme |
| `category()` | `POST` | `/api/GeneralCard/category` | Belge Sınıfı / Kategori Ekleme |
| `productBrand()` | `POST` | `/api/GeneralCard/productBrand` | Belge Sınıfı / Marka Ekleme |
| `priceList()` | `POST` | `/api/GeneralCard/priceList` | Fiyat Listesi Bilgisi |
| `priceListAccountRel()` | `POST` | `/api/GeneralCard/priceListAccountRel` | Fiyat Listesi Müşteri / Tedarikçi İlişkisi Ekleme |
| `getPriceListResult()` | `GET` | `/api/GeneralCard/getPriceListResultModel` | Fiyat Listesi Model Liste |
| `taxExemptionReason()` | `GET` | `/api/GeneralCard/taxExemptionReason` | Vergi Muafiyet Sebepleri |
| `withholdingTaxType()` | `GET` | `/api/GeneralCard/withholdingTaxType` | Tevkifat Bilgileri |
| `deliveryTerm()` | `GET` | `/api/GeneralCard/deliveryTerm` | Teslim Şartı Bilgileri |
| `transportMode()` | `GET` | `/api/GeneralCard/transportMode` | Gönderim Şekli Bilgileri |
| `getGIBAccountChangedList()` | `GET` | `/api/GeneralCard/getGIBAccountChangedList` | GİB Hesaplarını al |
| `getGibAccountModel()` | `GET` | `/api/GeneralCard/getGibAccountModel` | Gib Hesap Sorgula |
| `getNaceList()` | `GET` | `/api/GeneralCard/getNaceList` | Nace Kdv Listesi |
| `staffList()` | `GET` | `/api/GeneralCard/staff` | Personel Bilgileri |
| `staff()` | `POST` | `/api/GeneralCard/staff` | Personel Ekleme |
| `getUserInfo()` | `GET` | `/api/GeneralCard/getUserInfo` | Kullanıcı Bilgisi |
| `getUserCompanyInfo()` | `GET` | `/api/GeneralCard/getUserCompanyInfo` | Kullanıcı Firma Bilgisi |
| `accList()` | `POST` | `/api/GeneralCard/accList` | Hesap Planlarını Al |

---

## 8. IFRAME (`client.iframe` — 1 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getPortalUrl()` | `POST` | `/api/Iframe/getIframeUrl` | Iframe URL |

---

## 9. IYS (`client.iys` — 15 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `sendConsent()` | `POST` | `/api/Etk/sendConsent` | Tekil İzin Ekleme |
| `checkConsentStatus()` | `POST` | `/api/Etk/checkConsentStatus` | Tekil İzin Ekleme Durum Sorgulama |
| `checkTenantBrandsByTenantIdentifier()` | `POST` | `/api/Etk/checkTenantBrandsByTenantIdentifier` | IYS Kod ile Marka Sorgulama |
| `sendConsentBatch()` | `POST` | `/api/Etk/sendConsentBatch` | Çoklu İzin Ekleme |
| `checkBatchConsentStatus()` | `POST` | `/api/Etk/checkBatchConsentStatus` | Çoklu İzin Ekleme Durum Sorgulama |
| `checkRecipientStatus()` | `POST` | `/api/Etk/checkRecipientStatus` | Alıcı İzin Durum Sorgulama |
| `checkStatusChangedConsentData()` | `POST` | `/api/Etk/checkStatusChangedConsentData` | Durumu Değişen İzin Listesi |
| `takeConsentTransactionList()` | `POST` | `/api/Etk/consentTransactionList` | İzin Hareket Listesi |
| `iYSViaConsentSend()` | `POST` | `/api/IysVia/iYSViaConsentSend` | Via İzin Gönder |
| `iYSViaConsentConfirmCodeSend()` | `GET` | `/api/IysVia/iYSViaConsentConfirmCodeSend` | Via İzin Kaydı Onayla |
| `iYSViaConsentConfirmCodeSendNew()` | `POST` | `/api/IysVia/iYSViaConsentConfirmCodeSendNew` | Via İzin Kaydı Onayla (Yeni) |
| `iYSViaConsentResult()` | `GET` | `/api/IysVia/iYSViaConsentResult` | İzin Durum Sorgula |
| `checkRecipientStatus()` | `POST` | `/api/IysVia/kvkCheckRecipientStatus` | KVK Alıcı İzin Durum Sorgulama |
| `checkViaConsentKvkkRecipientList()` | `POST` | `/api/IysVia/viaConsentKvkkList` | KVKK İzin Listesi |
| `iYSViaConsentCreate()` | `POST` | `/api/IysVia/IYSViaConsentCreate` | Via İzin Kaydı Oluştur (IFrame) |

---

## 10. CAMPAIGNS (`client.campaigns` — 5 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `sendConsent()` | `POST` | `/api/Campaign/sendConsent` | İzin Gönder |
| `sendSMSConsentImmediate()` | `POST` | `/api/Campaign/sendSMSConsentImmediate` | Anlık SMS İzin Gönder |
| `checkConsentPermission()` | `GET` | `/api/Campaign/checkConsentPermission` | İzin Kontrol Et |
| `checkKVKKPermissionStatus()` | `GET` | `/api/Campaign/checkKVKKPermissionStatus` | KVKK İzin Kontrol |
| `confirmConsent()` | `GET` | `/api/Campaign/confirmConsent` | Doğrulama Kodu Onayla |

---

## 11. RECONCILIATION (`client.reconciliation` — 1 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `createAccountAgreement()` | `POST` | `/api/Agreement/createAccountAgreement` | Cari mutabakat oluşturma işlemi |

---

## 12. TAXPAYERS (`client.taxpayers` — 1 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getTaxPayerDetailInfo()` | `GET` | `/api/Taxpayer/getTaxPayerDetailInfo` | Mükellef Detay Sorgula |

---

## 13. ACCOUNTING (`client.accounting` — 13 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `bankAccountBalance()` | `GET` | `/api/PreAccounting/bankAccountBalance` | Banka Bakiyeleri Bilgileri |
| `cashboxBalance()` | `GET` | `/api/PreAccounting/cashboxBalance` | Kasa Bakiyeleri Bilgileri |
| `accountCurrencyBalance()` | `GET` | `/api/PreAccounting/accountCurrencyBalance` | Cari Dövizli Bakiyeleri |
| `accountTurkishLiraBalance()` | `POST` | `/api/PreAccounting/accountTurkishLiraBalance` | Cari TL Bakiyeleri |
| `chequeBillStatus()` | `GET` | `/api/PreAccounting/chequeBillStatus` | Çek Senet Durumları |
| `stockStatement()` | `GET` | `/api/PreAccounting/stockStatement` | Stok Ekstresi |
| `accountTransaction()` | `GET` | `/api/PreAccounting/accountTransaction` | Cari Hareketleri |
| `collectionList()` | `GET` | `/api/PreAccounting/collectionList` | Tahsilat Listesi |
| `paymentList()` | `GET` | `/api/PreAccounting/paymentList` | Ödeme Listesi |
| `invoiceList()` | `GET` | `/api/PreAccounting/invoiceList` | Faturalar |
| `invoiceItems()` | `GET` | `/api/PreAccounting/invoiceItems` | Fatura Kalemleri Bilgileri |
| `despatchList()` | `GET` | `/api/PreAccounting/despatchList` | İrsaliyeler |
| `despatchItems()` | `GET` | `/api/PreAccounting/despatchItems` | İrsaliye Kalemleri Bilgileri |

---

## 14. ORDERS (`client.orders` — 1 Metod)

| Metod Adı | HTTP | Endpoint | Açıklama |
| :--- | :---: | :--- | :--- |
| `getOrderList()` | `POST` | `/api/Order/getOrderList` | Sipariş Listesi |

---

