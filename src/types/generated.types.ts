/**
 * Mysoft E-Dönüşüm REST API v8 Otomatik Üretilen TypeScript Modelleri
 * Toplam 544 Şema
 */

/**
 * Hesap plan bilgileri
 */
export interface AccApiModel {
	/** Hesap planın tekil anahtarı */
	id?: number;
	/** Firmaya eklenmek istenen hesap plan adı bilgisidir. */
	accName?: string | null;
	/** Firmaya eklenmek istenen hesap plan kodu bilgisidir. */
	accNo?: string | null;
	/** Hesap planı bir Tckn ye ait ise ilgili hesabın Tckn bilgisidir. */
	tckn?: string | null;
	/** Hesap planı bir VKN ye ait ise ilgili hesabın VKN bilgisidir. */
	vkn?: string | null;
}

export interface AccApiModelListResultModel {
	data?: AccApiModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Cari Mutabakat Model
 */
export interface AccountAgreementApiModel {
	/** Bakiye Tarihi */
	balanceDate: string;
	/** Firma Kodu */
	accountCode?: string | null;
	/** Firma Unvanı */
	accountName: string;
	/** Vkn/Tckn */
	identifierNumber: string;
	/** Email */
	email: string;
	/** TRY Bakiyesi */
	tryBalance?: number;
	/** TRY Bakiye Tipi (BORC,ALACAK) */
	tryBalanceType?: string | null;
	/** USD Bakiyesi */
	usdBalance?: number;
	/** USD Bakiye Tipi */
	usdBalanceType?: string | null;
	/** EUR Bakiyesi */
	eurBalance?: number;
	/** EUR Bakiye Tipi */
	eurBalanceType?: string | null;
	/** Firma Adresi */
	address?: string | null;
	/** Vergi Dairesi Adı */
	taxOfficeName?: string | null;
	/** Klasör Adı */
	folderName?: string | null;
	/** Özel oluşturulmuş belge görünümünüz var ise, bu belge görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm var mı diye bakılır.Eğer var ise, bu kullanılır, yok ise standart dizayn kullanılarak mutabakat gönderilir. */
	xsltName?: string | null;
	/** Mutabakat taslak olarak kaydedilecek mi? */
	isSaveAsDraft?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * AccountBaseForOutboxModel
 */
export interface AccountBaseForOutboxModel {
	/** Cari hesabın unvan adı veya ad-soyad bilgisidir. */
	accountName: string;
	/** Cari hesabın TCKN/VKN bilgisidir. */
	identifierNumber?: string | null;
	city: GeneralLookupNameModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
}

/**
 * AccountBaseModel
 */
export interface AccountBaseModel {
	/** Cari hesapın tekil anahtarı */
	id: number;
	/** Cari hesabın unvan adı veya ad-soyad bilgisidir. */
	accountName: string;
	/** Cari hesabın TCKN/VKN bilgisidir. */
	identifierNumber?: string | null;
	city: GeneralLookupModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
}

/**
 * AccountCurrencyBalanceRequestModel
 */
export interface AccountCurrencyBalanceRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Tarih alanıdır. */
	docDate: string;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Borç Bakiye=1, Alacak Bakiye=2, Hepsi=3 */
	balanceStatus?: number | null;
	/** Bakiyesi ---- değerden büyükler gelsin. */
	balanceLimit?: number | null;
}

/**
 * AccountCurrencyBalanceResultModel
 */
export interface AccountCurrencyBalanceResultModel {
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Genel ortalama vade alanıdır. */
	gnlDueDate?: string;
	/** Genel ortalama gün alanıdır. */
	gnlDueDay?: number;
	/** Ortalama vade alanıdır. */
	balanceDueDate?: string;
	/** Ortalama gün alanıdır. */
	balanceDueDay?: number;
	/** Ortalama vade gün alanıdır. */
	avgDueDay?: number;
	/** Para birimi kodu bilgisidir. */
	currencyCode?: string | null;
	/** TL Bakiye bilgisidir. decimal precision : number(18,2) */
	balanceAmt?: number;
	/** Dövizli Bakiye bilgisidir. decimal precision : number(18,2) */
	balanceAmtTra?: number;
}

export interface AccountCurrencyBalanceResultModelQueryResultList {
	data?: AccountCurrencyBalanceResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Cari Hesap Modeli
 */
export interface AccountModel {
	/** Cari hesapın tekil anahtarı */
	id: number;
	/** Cari hesabın unvan adı veya ad-soyad bilgisidir. */
	accountName: string;
	/** Cari hesabın TCKN/VKN bilgisidir. */
	identifierNumber?: string | null;
	city: GeneralLookupModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
	/** Cari hesabın Kodu */
	accountCode?: string | null;
	/** Kısa ad alanıdır. */
	shortName?: string | null;
	taxOffice?: GeneralLookupModel;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** E-Posta alanıdır */
	email1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Cari hesabın cep telefonu numarası bilgisidir. */
	mobilePhone1?: string | null;
	/** Posta kodu */
	postalCode?: string | null;
	/** Kapı No alanıdır */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina No alanıdır */
	buildingNumber?: string | null;
	/** Kasaba veya köy alanıdır */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Web Sitesi alanıdır */
	webSiteUrl?: string | null;
	/** Nace Kodu alanıdır */
	naceCode?: string | null;
	/** Mersis No bilgisidir */
	mersisNo?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Vade Gün alanıdır. */
	dueDay?: number | null;
	/** Grup Seviyesi 1 Kategori bilgisidir. */
	category1Name?: string | null;
	/** Grup Seviyesi 2 Kategori bilgisidir. */
	category2Name?: string | null;
	/** Grup Seviyesi 3 Kategori bilgisidir. */
	category3Name?: string | null;
	/** Not alanıdır. */
	note?: string | null;
	/** Kaydın cari kod ile kontrol edilip edilmeyeceği bilgisidir. String (Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isCheckWithAccountCode?: string | null;
	/** Kaydın Pasif bilgisidir. String (Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
	/** Müşteri/Tedarikçi Tipi alanıdır. Integer(Enum) (Müşteri-Tedarikçi=1 - Personel=2 - Müşteri=3 - Tedarikçi=4) */
	accountCardType?: number;
	/** Cari Hesap Ek Metin 1 alanıdır. */
	addText1?: string | null;
	/** Cari Hesap Ek Metin 2 alanıdır. */
	addText2?: string | null;
	/** Cari Hesap Ek Sayı 1 alanıdır. */
	addInt1?: number | null;
	/** Cari Hesap Ek Sayı 2 */
	addInt2?: number | null;
	/** Cari Hesap Ek Tarih 1 */
	addDate1?: string | null;
	/** Cari Hesap Ek Tarih 2 */
	addDate2?: string | null;
	/** Cari Hesap Ek Tutar 1 */
	addDecimal1?: number | null;
	/** Cari Hesap Ek Tutar 2 */
	addDecimal2?: number | null;
}

export interface AccountModelListResultModel {
	data?: AccountModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Muhasebe Fişi Detay Modeli
 */
export interface AccountReceiptDetailModel {
	/** Muhasebe Fişi detayında yer alacak hesap planı kodu alanını ifade eder. */
	accNo: string;
	/** Muhasebe Fişi detay açıklama bilgisidir. */
	note?: string | null;
	/** Muhasebe Fişi 2. detay açıklama bilgisidir. */
	note2?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir. Girilen para birimi kodu "TRY" ise boş bırakabilirsiniz. Gönderilmez ise sistem hesaplayacaktır. */
	currencyRate?: number | null;
	/** Fiş satırının borç kaydı olması durumunda "D ", alacak olması durumunda ise "C" atılır. */
	debitCreditCode: string;
	/** Fiş satırına ait TRY belge tutar bilgisi bilgisidir. */
	amt: number;
	/** Fiş satırna ait belge para birimi cinsinden tutar bilgisi bilgisidir. Gönderilmez ise sistem kendi hesaplayacaktır. */
	amtTra?: number;
}

/**
 * Muhasebe Fişi Modeli
 */
export interface AccountReceiptModel {
	/** Muhasebe Fişi tarihi bilgisidir. */
	docDate: string;
	/** Muhasebe Fişi numarası bilgisidir. */
	docNo?: string | null;
	/** Muhasebe Fişi Fiş No bilgisidir. */
	receiptNo?: string | null;
	/** Muhasebe Fişi açıklama bilgisidir. */
	note?: string | null;
	/** Muhasebe Fişi 2. açıklama bilgisidir. */
	note2?: string | null;
	/** Muhasebe Fişi Tip bilgisidir.  Göndeilebilecek fiş tipleri; Açılış, Tahsil, Tediye, Mahsup, Kapanış. */
	receiptType: string;
	/** Muhasebe fişine kaynak teşkil eden belgenin türü gönderilir. Gönderilebilecek türler; Fatura, E-SMM, E-MM, Muhasebe, Finans Fişi, Çek, Senet, Gider Fişi, Ödeme Sistemleri, Sipariş, Banka Entegrasyonu, Z Raporu */
	documentTypeName: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
	/** Muhasebe fişi detay bilgileridir. Bir veya birden fazla kalem olacak şekilde girilebilir. */
	accountReceiptDetail: AccountReceiptDetailModel[];
}

/**
 * Cari Hareket Sorgu Model
 */
export interface AccountTransactionRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge tarihi başlangıç alanıdır. */
	docDateS?: string | null;
	/** Belge bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Belge sınıfı adı (Kategori,Proje vs.).Birden fazla değer geçilebilir. */
	categoryName?: string | null;
	/** Borç ='1' , Alacak = '-1' , Hepsi = '3' */
	plusMinus?: number | null;
}

/**
 * Cari Hareket Sorgu Sonuç Model
 */
export interface AccountTransactionResultModel {
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Alacak,borç durum bilgisidir. */
	plusMinusEnumText?: string | null;
	/** Cari hareketin oluştuğu kaynak bilgisidir. */
	transactionSource?: string | null;
	/** İşlem tipinin kod bilgisidir. */
	transactionTypeCode?: string | null;
	/** İşlem tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** Belge numarası bilgisidir. */
	docNo?: string | null;
	/** Belge tarihi bilgisidir. */
	docDate?: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Belge master not bilgisidir. */
	masterNote?: string | null;
	/** Belge detay not bilgisidir. */
	note?: string | null;
	/** Kur bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Belge para birimi cinsinden tutar bilgisidir. decimal precision : number(18,2) */
	amtTra?: number;
	/** Firma para birimi cinsinden tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Firma para birimi cinsinden bakiye bilgisidir. decimal precision : number(18,2) */
	balanceAmt?: number;
	/** Belge para birimi cinsinden bakiye bilgisidir. decimal precision : number(18,2) */
	balanceAmtTra?: number;
}

export interface AccountTransactionResultModelQueryResultList {
	data?: AccountTransactionResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Cari TL Bakiye Sorgu Model
 */
export interface AccountTurkishLiraBalanceRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Tarih alanıdır. */
	docDateE: string;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Borç Bakiye=1, Alacak Bakiye=2, Hepsi=3 */
	balanceStatus?: number | null;
	/** Bakiyesi ---- değerden büyükler gelsin. */
	balanceLimit?: number | null;
}

/**
 * Cari TL Bakiye Sorgu Sonuç Model
 */
export interface AccountTurkishLiraBalanceResultModel {
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Genel ortalama vade alanıdır. */
	gnlDueDate?: string;
	/** Genel ortalama gün alanıdır. */
	gnlDueDay?: number;
	/** Ortalama vade alanıdır. */
	balanceDueDate?: string;
	/** Ortalama gün alanıdır. */
	balanceDueDay?: number;
	/** Ortalama vade gün alanıdır. */
	avgDueDay?: number;
	/** TL Bakiye bilgisidir. decimal precision : number(18,2) */
	balanceAmt?: number;
	/** Borç Tutar bilgisidir. decimal precision : number(18,2) */
	totalDebit?: number;
	/** Alacak Tutar bilgisidir. decimal precision : number(18,2) */
	totalCredit?: number;
}

export interface AccountTurkishLiraBalanceResultModelQueryResultList {
	data?: AccountTurkishLiraBalanceResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Firma Logo ekleme
 */
export interface AddTenantLogoRequestModel {
	/** Logonun ekleneceği firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** İlgili logo dosya ismi */
	logoFileName: string;
	/** İlgili logo dosyasının ziplendikten sonra base64 stringe çevrilmiş halidir */
	logoFile: string;
}

/**
 * Belgeye eklenmek istenen ek bilgiler bu kısımda yazılmalıdır.
 */
export interface AdditionalDocumentRef {
	/** Eklenen her değer için unique bir değer yazılmalıdır. */
	id: string;
	/** Belge tarihi */
	issueDate: string;
	/** Döküman tipi */
	documentType: string;
	/** Döküman açıklamaları */
	documentDescription?: string[] | null;
	attachment?: AttachmentModel;
}

/**
 * İlave fatura bilgilerinin girildiği kısımdır. Fatura tipi “SGK” (InvoiceType) seçilmesi durumunda bu sınıfı kullanınız.
 */
export interface AdditionalInvoiceInfoModel {
	/** İlave Fatura Tipi 
 Faturanın hangi sağlık hizmet sunucusundan geldiğine ilişkindir.
 (HASTANE --> “SAGLIK_HAS” 
 ECZANE  -->  “SAGLIK_ECZ” 
 OPTİK --> “SAGLIK_OPT” 
 MEDİKAL --> “SAGLIK_MED” 
 ABONELİK --> “ABONELIK” 
 MAL VE HİZMET --> “MAL_HIZMET”  
 DİĞER --> “DIGER) */
	accountingCostType?: string | null;
	/** Mükellef Kodu 
 Sağlık hizmet sunucusunun Kurumda tanımlı tesis kodudur.Sağlık hizmet sunucusunun Kurumda tanımlı kodu bulunmaması halinde bu bölüm 0000 şeklinde girilmelidir. */
	taxPayerCode?: string | null;
	/** Mükellef Adı 
 Sağlık hizmet sunucusunun Kurumda tanımlı adıdır.Sağlık hizmet sunucusunun Kurumda tanımlı bir adı bulunmaması halinde bu bölüm sağlık hizmet sunucularının ruhsatlarındaki adı olmalıdır. */
	taxPayerName?: string | null;
	/** Dosya No 
 Sağlık hizmet sunucusunun dönem sonunda MEDULA üzerinde işlemlerini sonlandırdığında MEDULA sisteminde verilen evrak referans numarasıdır.MEDULA sisteminde bu numaraların üretilmediği hallerde bu bölüm 0000 olmalıdır */
	documentNumber?: string | null;
}

/**
 * Şube Model
 */
export interface AgentAccountModel {
	/** Şube unvan adı veya ad-soyad bilgisidir. */
	agentAccountName?: string | null;
	/** Şube numarası. */
	agentNumber: string;
	city: GeneralLookupNameModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** E-Posta alanıdır */
	email1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Posta kodu */
	postalCode?: string | null;
	/** Kapı No alanıdır */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina No alanıdır */
	buildingNumber?: string | null;
	/** Kasaba veya köy alanıdır */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
}

export interface AliciMusteri {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
}

/**
 * Fatura üzerindeki iskontoyu tutan sınıf
 */
export interface AllowanceCharge {
	/** İskonto mu yoksa artırımmı yapılacağını belirtir. İskonto için false geçilmelidir. */
	chargeIndicator?: boolean;
	/** İskonto/Artırım nedeni. Fatura tipi HKS olduğunda, bu alan bazı sabit değerler girilmesi gerekebilir.
 İlgili Sabit değerler şu şekildedir. (HKSKOMISYON,HKSKOMISYONKDV,HKSNAVLUN,HKSNAVLUNKDV,HKSHAMMALIYE,HKSHAMMALIYEKDV
 HKSNAKLIYE,HKSNAKLIYEKDV,HKSGVTEVKIFAT,HKSBAGKURTEVKIFAT,HKSRUSUM,HKSRUSUMKDV,HKSTICBORSASI,HKSTICBORSASIKDV,
 HKSMILLISAVUNMAFON,HKSMSFONKDV,HKSDIGERMASRAFLAR,HKSDIGERKDV) */
	allowanceChargeReason?: string | null;
	/** İskonto/Artırım oranı. Değer / 100 şeklinde yazılmalıdır. Örneğin %10 iskonto yapmak için buraya 0.1 yazılmalıdır. */
	multiplierFactorNumeric?: number;
	/** İskonto sıra numarası */
	sequenceNumeric?: number;
	/** İskonto/Artırım tutarı */
	amount?: number;
	/** İskonto/Artırım yapılan ana değer */
	baseAmount?: number;
}

/**
 * Firma Aktivasyon Posta Kutusu Bilgilerini tutar. Aktivasyon yapılcak ürün; ("E-Fatura", "E-İrsaliye") ise girilmesi zorunludur.
 */
export interface ApiActivationAliasModel {
	/** Etiket ön ek bilgisidir. Posta kutusu ve gönderici birim için kullanılacak alandır. */
	aliasPrefix?: string | null;
	/** Etiketin alan adı kısmıdır. @ işaretinden sonraki kısım yazılmalıdır. */
	domainName?: string | null;
}

/**
 * Firma Aktivasyon Bilgilerini tutar
 */
export interface ApiTenantActivationGetModel {
	/** Aktivasyon Id */
	id?: number;
	/** Aktivasyon tipi bilgisidir.(TurnOn,TurnOff,NoActivation) */
	activationDemandType?: string | null;
	/** Aktivasyon talep tarihi bilgisidir. */
	activationDemandDate?: string;
	/** Aktivasyon yapılacak ürün bilgisidir.(EInvoice,EInvoiceArchive,EArchive,EArchiveArchive,EDespatch,EDespatchArchive,EBook,EBookArchive,ESEVoucher,ESEVoucherArchive,EProducerVoucher,EProducerVoucherArchive,PreAccounting,IYS,EExchangeDocument,EBillDocument,IYSVia,EBookSecondArchive) */
	activationProductType?: string | null;
	/** Belge seri ön ek bilgisidir. */
	serialNumberPrefix?: string | null;
	/** E-Arşiv Fatura(İnternet) seri ön ek bilgisidir. */
	internetSerialNumberPrefix?: string | null;
	/** IYS Kodu bilgisidir. */
	iysCode?: string | null;
	/** İrsaliye yanıt belgesi seri ön ek bilgisidir. */
	despatchResponseSerialNumberPrefix?: string | null;
	/** E-Döviz belgesi seri ön ek bilgisidir. */
	eExchangeDocumentPurchaseSerialNumberPrefix?: string | null;
	/** Posta kutusu bilgisidir. */
	pkAlias?: string | null;
	/** Gönderici birim bilgisidir. */
	gbAlias?: string | null;
	/** Aktivasyon başvuru dosyasının GİB tarafındaki başvuru durum kodu. */
	gibServiceStatus?: string | null;
	/** Aktivasyon başvuru dosyasının GİB tarafındaki başvuru durum açıklaması. */
	gibServiceMessage?: string | null;
	/** Aktivasyon talep durumu bilgisidir. String (Enum) ("(WillBeSendToGib) - Gib'e Gönderilecek", "(SentToGib) - Gib'e Gönderildi", "(Approved) - Onaylandı", "(Canceled) - İptal Edildi", "(Error) - Hata", "(Close) - Kapaması Alındı", "(Wait) - Aktivasyon Bekliyor", "(ManuelClose) - Bağımsız Kapanış") */
	activationDemandStatus?: string | null;
	/** İşletici kuruluş bilgisidir. 1 = Ödeal, 2 = Pavo */
	serviceOperatorType?: number | null;
}

export interface ApiTenantActivationGetModelListResultModel {
	data?: ApiTenantActivationGetModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Firma Aktivasyon Bilgilerini tutar
 */
export interface ApiTenantActivationModel {
	/** Firma Aktivasyon tablosunun tekil alanıdır. */
	id: number;
	/** Firma VKN/TCKN bilgisidir.Yazılan karakter sayısına göre,firma tipi belirlenir. (Tüzel/Gerçek) dikkatlı giriş yapınız. */
	vknTckn?: string | null;
	/** Aktivasyon talep tarihi bilgisidir. */
	activationDemandDate: string;
	/** Aktivasyon yapılacak ürün bilgisidir. String (Enum) ("EInvoice"(E-Fatura), "EArchive"(E-Arşiv Fatura), "EDespatch"(E-İrsaliye), "EBook"(E-Defter), "ESEVoucher"(E-Serbest Meslek Makbuzu), "EProducerVoucher"(E-Müstahsil Makbuzu),"EExchangeDocument"(E-Döviz),"EBillDocument"(E-Adisyon),"GIBEArchiveInvoice"(E-Arşiv Fatura(GIB)),"MarketPlace"(Pazaryeri),"Agreement"(Mutabakat), "PreAccounting"(Ön Muhasebe), "EInvoiceArchive"(E-Fatura Saklama), "EArchiveArchive"(E-Arşiv Fatura Saklama), "EDespatchArchive"(E-İrsaliye Saklama), "ESEVoucherArchive"(E-SMM Saklama), "EProducerVoucherArchive"(E-MM Saklama), "EBookArchive""E-Defter Saklama", "ConsentsManagement"(İzin Yönetimi),"EBookSecondArchive"(İkincil Defter Kopyalama), "MysoftIYS"(Mysoft İYS)) */
	activationProductType: string;
	/** Belge seri ön ek bilgisidir. Aktivasyon yapılcak ürün; ("E-Arşiv", "E-Fatura", "E-İrsaliye") ise girilmesi zorunludur. */
	serialNumberPrefix?: string | null;
	/** E-Arşiv Fatura(İnternet) seri ön ek bilgisidir. Aktivasyon yapılcak ürün; ("E-Arşiv") ise girilmesi zorunludur. */
	internetSerialNumberPrefix?: string | null;
	/** İrsaliye yanıt belgesi seri ön ek bilgisidir. Aktivasyon yapılcak ürün; ("E-İrsaliye") ise girilmesi zorunludur. */
	despatchResponseSerialNumberPrefix?: string | null;
	/** E-Döviz belgesi seri ön ek bilgisidir. */
	eExchangeDocumentPurchaseSerialNumberPrefix?: string | null;
	/** İnteraktif Vergi Dairesi kullanıcı adı */
	iVdUsername?: string | null;
	/** İnteraktif Vergi Dairesi şifresi */
	iVdPassword?: string | null;
	/** İYS Kod Bilgisi */
	iysCode?: string | null;
	activationAlias?: ApiActivationAliasModel;
}

/**
 * Firma Bilgilerini tutar
 */
export interface ApiTenantGetModel {
	/** Firma adı bilgisidir.Tüzel ise firmanın unvanı,gerçek kişi ise ad soyad bilgisi yazılır. */
	tenantName: string;
	/** Firmanın uygulamada gözükmesi istenen kısa ad bilgisi girilir. */
	shortName: string;
	/** Firma VKN/TCKN bilgisidir.Yazılan karakter sayısına göre,firma tipi belirlenir. (Tüzel/Gerçek) dikkatlı giriş yapınız. */
	vknTckn: string;
	taxOffice?: TaxOfficeLookupModel;
	/** Firma sicil numarası bilgisidir. */
	registerNo: string;
	/** Firma ticaret sicil unvanı bilgisidir. */
	tradeRegisteryName?: string | null;
	/** Firmanın mersis numarası bilgisidir. */
	mersisNo?: string | null;
	/** İşletme merkezi bilgisidir. */
	businessCenter?: string | null;
	/** Firmanın kuruluş tarihi bilgisidir. */
	establishmentDate?: string | null;
	/** Firmanın kapanış tarihi bilgisidir. */
	closingDate?: string | null;
	/** Şirket öz sermayesi */
	capitalAmt?: number | null;
	/** Telefon numarası bilgisidir. */
	telephone?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email: string;
	/** Fax bilgisidir. */
	fax?: string | null;
	/** Firma web sayfası adres bilgisidir. */
	webSiteURL?: string | null;
	tenantAdress?: TenantAdressModel;
	/** İş ortağına tanımlı tarifeleri firmaya tanımlar. */
	addTariffToTenant?: boolean;
	/** Firma tablosunun tekil alanıdır. */
	id?: number;
	/** taxOfficeCode */
	taxOfficeCode?: string | null;
	/** taxOfficeName */
	taxOfficeName?: string | null;
	/** currencyCode */
	currencyCode?: string | null;
	/** currencyName */
	currencyName?: string | null;
	/** countryCode */
	countryCode?: string | null;
	/** countryName */
	countryName?: string | null;
	/** cityCode */
	cityCode?: string | null;
	/** cityName */
	cityName?: string | null;
	/** citySubdivision */
	citySubdivision?: string | null;
	/** district */
	district?: string | null;
	/** streetName */
	streetName?: string | null;
	/** blockName */
	blockName?: string | null;
	/** buildingName */
	buildingName?: string | null;
	/** buildingNumber */
	buildingNumber?: string | null;
	/** room */
	room?: string | null;
	/** region */
	region?: string | null;
	/** postalCode */
	postalCode?: string | null;
	/** portalDbName */
	portalDbName?: string | null;
	/** isPassive */
	isPassive?: boolean;
}

export interface ApiTenantGetModelListResultModel {
	data?: ApiTenantGetModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Firma Bilgilerini tutar
 */
export interface ApiTenantModel {
	/** Firma adı bilgisidir.Tüzel ise firmanın unvanı,gerçek kişi ise ad soyad bilgisi yazılır. */
	tenantName: string;
	/** Firmanın uygulamada gözükmesi istenen kısa ad bilgisi girilir. */
	shortName: string;
	/** Firma VKN/TCKN bilgisidir.Yazılan karakter sayısına göre,firma tipi belirlenir. (Tüzel/Gerçek) dikkatlı giriş yapınız. */
	vknTckn: string;
	taxOffice?: TaxOfficeLookupModel;
	/** Firma sicil numarası bilgisidir. */
	registerNo: string;
	/** Firma ticaret sicil unvanı bilgisidir. */
	tradeRegisteryName?: string | null;
	/** Firmanın mersis numarası bilgisidir. */
	mersisNo?: string | null;
	/** İşletme merkezi bilgisidir. */
	businessCenter?: string | null;
	/** Firmanın kullandığı para birimi kodu bilgisi yazılır.Para birimi kod listesine GET_Currency servisinden ulaşabilirsiniz. */
	currencyCode?: string | null;
	/** Firmanın kuruluş tarihi bilgisidir. */
	establishmentDate?: string | null;
	/** Firmanın kapanış tarihi bilgisidir. */
	closingDate?: string | null;
	/** Şirket öz sermayesi */
	capitalAmt?: number | null;
	/** Telefon numarası bilgisidir. */
	telephone?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email: string;
	/** Fax bilgisidir. */
	fax?: string | null;
	/** Firma web sayfası adres bilgisidir. */
	webSiteURL?: string | null;
	tenantAdress?: TenantAdressModel;
	/** İş ortağına tanımlı tarifeleri firmaya tanımlar. */
	addTariffToTenant?: boolean;
}

/**
 * Firma Nace Kdv Oranları sınıfı
 */
export interface ApiTenantNaceViewModel {
	/** Firma şube numarası. */
	branchNumber?: string | null;
	/** Vergi dairesi kodu. */
	taxOfficeCode?: string | null;
	/** Faaliyet alanı kodu. */
	naceCode?: string | null;
	/** Faaliyet alanı açıklaması. */
	naceName?: string | null;
	/** Faal/Terk durumu. */
	naceStatus?: number;
	/** Faal/Terk durumu açıklaması. */
	naceStatusText?: string | null;
	/** Faaliyet alanı başlangıç tarihi. */
	startDate?: string | null;
	/** Faaliyet alanı bitiş tarihi. */
	enddate?: string | null;
	/** Faaliyet alanı başlangıç tarihi (Değer null dönmesi durumunda faaliyet sonlanmamıştır). */
	naceOpTimeStartDate?: string | null;
	/** Faaliyet alanı bitiş tarihi (Değer null dönmesi durumunda faaliyet sonlanmamıştır). */
	naceOpTimeEndDate?: string | null;
	/** İlgili nace için kullanılabilir kdv oranları (Aynı satır içerisinde ';' ile ayrılarak verilmiştir). */
	vatRates?: string | null;
}

export interface ApiTenantNaceViewModelListResultModel {
	data?: ApiTenantNaceViewModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Bildirim ayar modeli
 */
export interface ApiTenantNotificationSettingsModel {
	/** Bildirim Ayarlarının oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** Tenant Bildirim ayar listesi */
	notificationSettingList?: NotificationSettingsModel[] | null;
}

/**
 * Bildirim Ayarı kaldırma modeli
 */
export interface ApiTenantNotificationSettingsRemoveModel {
	/** Bildirim Ayarlarının kaldırılacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** Firmaya eklenmek istenen bildirim tipi bilgisidir. Bildirim Kodu gönderilir.
	 *Mysoft Portalde Firma bilgileri>Belge Ayarları ekranındaki Bildirimler sekmesinden bildirim kodlarına erişebilir. */
	notificationCode: string;
}

/**
 * Firma Sözleşme Bilgilerini tutar
 */
export interface ApiTenantPreContractModel {
	/** Sözleşme eklenmek istenen firmanın VKN/TCKN sidir. */
	vknTckn: string;
	/** Firmaya eklenmek istenen tarife kodu bilgisidir. */
	tariffCode: string;
	/** Firmaya eklenmek istenen paket bilgisidir. Kontör adedi bilgisi gönderilir. */
	qty: number;
	/** Firmaya eklenmek istenen sözleşmenin başlangıç tarihi bilgisidir. */
	startDate: string;
	/** Kontör yüklemesinin otomatik yapılıp yapılmayacağının bilgisidir. */
	isLoadCredit: boolean;
}

/**
 * Tenant SMTP Ayar modeli
 */
export interface ApiTenantSmtpSettingsModel {
	/** SMTP Ayarlarının oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn?: string | null;
	/** Sunucu */
	host?: string | null;
	/** Port */
	port?: number;
	/** SSL kullanılacak */
	isUseSSL?: boolean;
	/** Kullanıcı Adı */
	userName?: string | null;
	/** Şifre */
	password?: string | null;
}

/**
 * Firma kaşe ekleme
 */
export interface ApiTenantStampRequestModel {
	/** Kaşenin ekleneceği firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** İlgili kaşe dosya ismi */
	stampFileName: string;
	/** İlgili kaşe dosyasının ziplendikten sonra base64 stringe çevrilmiş halidir */
	stampFile: string;
}

/**
 * Güncellenecek firma bilgilerini tutar
 */
export interface ApiTenantUpdateModel {
	/** Firma VKN/TCKN bilgisidir.Yazılan karakter sayısına göre,firma tipi belirlenir. (Tüzel/Gerçek) dikkatlı giriş yapınız. */
	vknTckn: string;
	/** Firmanın kuruluş tarihi bilgisidir. */
	establishmentDate?: string | null;
	/** Firmanın kapanış tarihi bilgisidir. */
	closingDate?: string | null;
	/** Şirket öz sermayesi */
	capitalAmt?: number | null;
	/** Telefon numarası bilgisidir. */
	telephone?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email: string;
	/** Fax bilgisidir. */
	fax?: string | null;
	/** Firma web sayfası adres bilgisidir. */
	webSiteURL?: string | null;
	tenantAdress?: TenantAdressModel;
}

/**
 * Firma Kullanıcı Bilgilerini tutar
 */
export interface ApiTenantUserModel {
	/** Kullanıcının adı bilgisidir. */
	name: string;
	/** Kullanıcının soyadı bilgisidir. */
	surname: string;
	/** Kullanıcı uygulamaya giriş yapacağı kullanıcı adı(e-posta) adresidir. */
	username: string;
	/** Kullanıcının oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** Kullanıcıya verilecek yetkilerin admin rolünde mi verileceğinin bilgisidir. Alabileceği değerler ("EVET", "HAYIR") */
	isCompanyAdmin?: string | null;
}

/**
 * Firma Bilgilerini izleme sınıfı
 */
export interface ApiTenantViewModel {
	/** Firma tablosunun tekil alanıdır. */
	id?: number;
	/** Firma adı bilgisidir.Tüzel ise firmanın unvanı,gerçek kişi ise ad soyad bilgisi yazılır. */
	tenantName?: string | null;
	/** Firmanın uygulamada gözükmesi istenen kısa ad bilgisi girilir. */
	shortName?: string | null;
	/** Firma VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	taxOffice?: TaxOfficeLookupModel;
	/** Firma sicil numarası bilgisidir. */
	registerNo?: string | null;
	/** Firma ticaret sicil unvanı bilgisidir. */
	tradeRegisteryName?: string | null;
	/** Firmanın mersis numarası bilgisidir. */
	mersisNo?: string | null;
	/** İşletme merkezi bilgisidir. */
	businessCenter?: string | null;
	/** Firmanın kullandığı para birimi kodu */
	currencyCode?: string | null;
	/** Telefon numarası bilgisidir. */
	telephone?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email?: string | null;
	/** Fax bilgisidir. */
	fax?: string | null;
	/** Firma web sayfası adres bilgisidir. */
	webSiteURL?: string | null;
	tenantAdress?: TenantAdressModel;
}

export interface ApiTenantViewModelResultModel {
	data?: ApiTenantViewModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Firma VUK 507 Aktivasyon Bilgilerini tutar
 */
export interface ApiTenantVuk507ActivationModel {
	/** Firma VKN/TCKN bilgisidir.Yazılan karakter sayısına göre firma tipi belirlenir. (Tüzel/Gerçek) dikkatlİ giriniz. */
	tenantVknTckn: string;
	/** İşletici kuruluş seçim bilgisidir. 1 = Ödeal, 2 = Pavo */
	serviceOperatorType: number;
	/** Aktivasyon talep tipi bilgisidir. 1 = Açılış */
	activationDemandType: number;
	/** Aktivasyon talep tarihi bilgisidir. */
	activationDemandDate: string;
	/** Aktivasyon yapılacak ürün bilgisidir. "EInvoice"(E-Fatura), "EArchive"(E-Arşiv Fatura) */
	activationProductType: string;
	/** GIB alias tipi bilgisidir. 1 = GBAlias — Sadece Gönderici Birim, 3 = GBAliasAndPKAlias — Gönderici Birim ve Posta Kutusu */
	activationAliasType?: number;
	/** Gönderici Birim Bilgisi. */
	gbAlias?: string | null;
	/** Alıcı Birim Etiketi. */
	pkAlias?: string | null;
}

/**
 * Firma Dizayn sorgulama
 */
export interface ApiTenantXsltGetRequestModel {
	/** Dizaynın oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** İlgili dizaynın ismi. Belge gönderimlerinde istenirse bu isim kullanılabilir. */
	xsltName?: string | null;
	/** Belge tipi (1 - E-Fatura, 2 - E-Arşiv Fatura, 3 - E-İrsaliye, 
 4 - E-İrsaliye Yanıt, 5 - Serbest Meslek Makbuzu, 6 - Müstahsil Makbuzu , 
 7 - E-Döviz ve Kıymetli Maden Satım
 8 - E-Döviz ve Kıymetli Maden Alım, 9 - E-Adisyon, 10 - E-Arşiv Fatura (GIB), 93 - Cari Mutabakat, 94 - BaBs Mutabakat, 95 - Fatura, 
 96 - İrsaliye, 97 - Sipariş, 100 - Çek, 101 Senet, 102 - Finans */
	edocumentType?: number | null;
	/** İnternet Satış içinmi? */
	isInternetSales?: boolean | null;
}

/**
 * Firma Dizayn ekleme sınıfı
 */
export interface ApiTenantXsltModel {
	/** Dizaynın oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** İlgili dizaynın ismi. Belge gönderimlerinde istenirse bu isim kullanılabilir. */
	xsltName: string;
	/** Belge tipi (1 - E-Fatura, 2 - E-Arşiv Fatura, 3 - E-İrsaliye, 
 4 - E-İrsaliye Yanıt, 5 - Serbest Meslek Makbuzu, 6 - Müstahsil Makbuzu , 
 7 - E-Döviz ve Kıymetli Maden Satım
 8 - E-Döviz ve Kıymetli Maden Alım, 9 - E-Adisyon, 10 - E-Arşiv Fatura (GIB), 93 - Cari Mutabakat, 94 - BaBs Mutabakat, 95 - Fatura, 
 96 - İrsaliye, 97 - Sipariş, 100 - Çek, 101 Senet, 102 - Finans */
	edocumentType: number;
	/** İnternet Satış içinmi? */
	isInternetSales?: boolean | null;
	/** İlgili xslt dosyasının ziplendikten sonra base64 stringe çevrilmiş halidir. */
	xsltFile: string;
	/** XSLT'ye firma logosu eklenecek mi? */
	isHasLogo?: boolean | null;
	/** XSLT'ye firma kaşesi eklenecek mi? */
	isHasStamp?: boolean | null;
}

/**
 * Firma Dizayn Model
 */
export interface ApiTenantXsltResultModel {
	/** Dizayn Id */
	id?: number;
	/** Belge Tipi */
	eDocumentTypeEnumText?: string | null;
	/** Dizayn Adı */
	xsltName?: string | null;
	/** Varsayılan bilgisi */
	isDefault?: boolean;
	/** İnternet Satış bilgisi */
	isInternetSales?: boolean;
	/** Onay bilgisi */
	isApproved?: boolean | null;
	/** Onay Tarihi */
	approvedDate?: string | null;
}

export interface ApiTenantXsltResultModelListResultModel {
	data?: ApiTenantXsltResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Eklenecek dosya bilgilerinin yer aldığı model.
 */
export interface AttachmentModel {
	/** Karakter set kodu. Varsayılan olarak "UTF-8" olarak gönderiniz. */
	characterSetCode?: string | null;
	/** Dosya encoding kodu. Varsayılan olarak "Base64" olarak gönderiniz. */
	encodingCode?: string | null;
	/** Eklenen dosya adı */
	filename?: string | null;
	/** Eklenen dosya içerik tipi. XSLT tipindeki dosyalar için "application/xml" olarak gönderiniz. */
	mimeCode?: string | null;
	/** Faturaya eklenecek dosyanın Zip'lenip base64'e çevrilmiş hali */
	attachmentFile?: string | null;
}

export interface BankAccountBalanceRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Tarih alanıdır. */
	docDate: string;
	/** Hesap No başlangıç alanıdır. */
	bankAccountCodeS?: string | null;
	/** Hesap No bitiş alanıdır. */
	bankAccountCodeE?: string | null;
}

/**
 * Banka Bakiyesi sonuç nesnesi
 */
export interface BankAccountBalanceResultModel {
	/** Hesap Id değeri */
	bankAccountId?: number;
	/** Hesap No bilgisidir. */
	bankAccountCode?: string | null;
	/** Hesap Adı bilgisidir. */
	bankAccountName?: string | null;
	/** Hesap Tipi bilgisidir. */
	bankAccountTypeEnumText?: string | null;
	/** Para Birimi bilgisidir. */
	currencyCode?: string | null;
	/** Borç Tutar bilgisidir. decimal precision : number(18,2) */
	debitAmt?: number;
	/** Alacak Tutar bilgisidir. decimal precision : number(18,2) */
	creditAmt?: number;
	/** Borç Tutar bilgisidir. decimal precision : number(18,2) */
	debitAmtTra?: number;
	/** Alacak Tutar bilgisidir. decimal precision : number(18,2) */
	creditAmtTra?: number;
	/** Net Tutar bilgisidir. decimal precision : number(18,2) */
	balanceAmt?: number;
	/** Net Tutar bilgisidir. decimal precision : number(18,2) */
	balanceAmtTra?: number;
}

export interface BankAccountBalanceResultModelQueryResultList {
	data?: BankAccountBalanceResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * İlave Döküman/Bilgiler
 */
export interface BankReceiptOutboxAdditionalDocumentReferanceModel {
	/** schemaId */
	schemaId?: string | null;
	/** Id */
	id?: string | null;
	/** issueDate */
	issueDate?: string;
	/** documentTypeCode */
	documentTypeCode?: string | null;
	/** documentType */
	documentType?: string | null;
	/** documentTypeDescription */
	documentDescription?: string | null;
}

/**
 * e-Dekont belgesi alıcı hesap bilgileri
 */
export interface BankReceiptOutboxCustomerAccountModel {
	/** VKN/TCKN bilgisidir. */
	vknTckn: string;
	/** Müşteri Numarası */
	customerNo?: string | null;
	/** Pasaport Numarası */
	passportNo?: string | null;
	/** IBAN */
	iban?: string | null;
	/** unvan adı veya ad-soyad bilgisidir. */
	accountName: string;
	/** Adı */
	firstName?: string | null;
	/** Soyadı */
	familyName?: string | null;
	/** Uyruğu */
	nationality?: string | null;
	/** Vergi dairesi adı bilgisidir. */
	taxOfficeName?: string | null;
	/** Ülke Adı alanıdır */
	countryName: string;
	/** Şehir Adı alanıdır */
	cityName: string;
	/** İç kapı numarası bilgisidir. */
	room?: string | null;
	/** Meydan/bulvar/cadde adı bilgisidir. */
	streetName?: string | null;
	/** Blok Adı alanıdır */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina veya bloğa ait dış kapı numarası bilgisidir. */
	buildingNumber?: string | null;
	/** Semt alanıdır */
	citySubdivision: string;
	/** Posta Kodu alanıdır */
	postalCode?: string | null;
	/** Kasaba/köy/mezra/mevkii bilgisidir. */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email1?: string | null;
	/** Web sayfası adresi bilgisidir. */
	webSiteUrl?: string | null;
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. Örn: 34ABC12345 */
	licencePlate?: string | null;
}

/**
 * Dekont üzerine yazılan ek bilgileri içerir
 */
export interface BankReceiptOutboxDefinedAdditionalDocumentRefModel {
	/** Gönderilen Temsilci */
	sentRepresentative?: string | null;
	/** Banka Provizyon No */
	bankProvisionNo?: string | null;
	/** Banka Provizyon Tarihi */
	bankProvisionDate?: string | null;
	/** İşlem Referans No */
	transactionRefNo?: string | null;
	/** İşlem Referans Belge Tarihi */
	transactionRefDate?: string | null;
	/** İşlem Kanalı */
	transactionChannel?: string | null;
	/** Fatura Belge numarası. CreditNoteTypeCode , FTK veya FTM olduğunda bu alan kullanılır. */
	invoiceDocNo?: string | null;
	/** Fatura tarihi */
	invoiceDate?: string | null;
	/** VTA GVTA Belge Numarası.  CreditNoteTypeCode , VTA veya GVTA olduğunda bu alan kullanılır. */
	vtaGvtaDocNo?: string | null;
	/** VTA GVTA Belge Tarihi */
	vtaGvtaDocDate?: string | null;
}

/**
 * e-Dekont detay bilgisi
 */
export interface BankReceiptOutboxDetailModel {
	/** İşlem Adı */
	transactionName?: string | null;
	/** İşlem Açıklaması */
	transactionDescription?: string | null;
	/** İşlem Kodu */
	transactionCode?: string | null;
	/** Para birimi kodu */
	currencyCode?: string | null;
	/** Hizmet bedeli */
	priceAmount?: number;
	/** İndirim sebebi */
	allowanceChargeReason?: string | null;
	/** İndirim tutarı */
	allowanceChargeAmount?: number;
}

/**
 * Referans bilgileri. Referans verilen ya da eklenen belgelere ilişkin bilgiler girilecektir.
 */
export interface BankReceiptOutboxDocumentReferanceModel {
	/** Referans belge numarası */
	receiptDocumentReferanceId?: string | null;
	/** Belge tarihi */
	issueDate?: string;
	/** Belge kodu */
	documentTypeCode?: string | null;
	/** Belge açıklaması */
	documentDescription?: string | null;
}

/**
 * Dekont belge tutarları
 */
export interface BankReceiptOutboxLegalMonetaryTotal {
	/** Mal ve hizmet tutarı */
	lineExtensionAmount?: number;
	/** Vergiler hariç toplam tutar */
	taxExclusiveAmount?: number;
	/** Vergiler Dahil toplam tutar */
	taxInclusiveAmount?: number;
	/** Ödenecek tutar */
	payableAmount?: number;
	/** Toplam indirim tutarı */
	allowanceTotalAmount?: number;
}

/**
 * e-dekont modeli
 */
export interface BankReceiptOutboxModel {
	/** Kullanılan Senaryo.
 Bankacılık işlemleri, Elektronik Para ve Ödeme Kuruluşları için DEKONT, DEKONTIPTAL,
 Vergi Tahsil Alındısı işlemi için VTA, VTAIPTAL,
 Gümrük Vergisi Tahsil Alındısı işlemi için GVTA, GVTAIPTAL girilecektir. */
	bankReceiptProfile: string;
	/** Dekont belge numarası. Üç haneli alfa numerik birim kod ile 13 haneli müteselsil numaranın birleşiminden meydana gelen Dekont Belgesi Numarası bu elemana yazılacaktır. Müteselsil numaranın ilk dört hanesi dekontun düzenlendiği yılı kalan dokuz hane ise müteselsil numarayı ifade etmektedir. Dekont Belgesi düzenleyen bünyesinde aynı Dekont Belgesi numarası birden fazla kullanılamaz. */
	docNo?: string | null;
	/** Asıl/Suret. Bu elemanda düzenlenen Dekont Belgesinin asıl veya suret olduğu gösterilecektir. */
	copyIndicator?: boolean;
	/** Evrensel Tekil Tanımlama Numarası (ETTN), düzenlenen dekontun evrensel eşsizliğini sağlayan numaradır. Bu numara dekont belgesi düzenleyen tarafından standartlara uygun olarak üretilecektir. */
	bankReceiptETTN?: string | null;
	/** Düzenleme Tarihi */
	docDate: string;
	/** Düzenleme Zamanı */
	docTime: string;
	/** Ödeme Kuruluşları ve Elektronik Para Kuruluşları İşlem Kodları :
 EPIH - Ödeme Kuruluşları ve Elektronik Para Kuruluşlarının İhracı işlemleri
 PAGO - Para Gönderme işlemleri
 PAL - Para Alma işlemleri
 POSH - POS Hizmetleri
 FTM - Fatura Tahsilatı (Müşteri)
 FTK - Fatura Tahsilatı (Kurum)
 DIGER - Eşleşmeyen İşlemler İçin Kullanılacak
 Bankacılık İşlemleri İçin : 
 NKT - Nakit(kasadan yapılan) işlemler,
 HVL - Havale, 
 EFT - EFT, 
 SWT - SWIFT, 
 OKT - Ödeme kuruluşları aracılığı ile transfer,
 MOT - Muhabirlik Ödemeleri ile gerçekleşen transfer, 
 DVZ - Döviz işlemleri, 
 KMI - Kıymetli maden işlemleri,
 ARB - Arbitraj işlemleri, 
 NKR - Nakdi kredi işlemleri , 
 GKR - Gayri nakdi kredi işlemleri, 
 KEI - Kıymetli evrak işlemleri,
 KKI - Kredi kartı işlemleri, 
 YKI - Yabancı kredi kartı işlemleri, 
 DKI - Debit kart işlemleri, 
 DIGER - Eşleşmeyen İşlemler İçin Kullanılacak */
	creditNoteTypeCode: string;
	/** Banka Şube Kodu */
	branchCode?: string | null;
	/** Banka Şube Adı */
	branchName?: string | null;
	/** Veznedar Adı */
	tellarName?: string | null;
	/** Veznedar Soyadı */
	tellarFamilyname?: string | null;
	/** Veznedar Kimlik No */
	tellarNationalityId?: string | null;
	/** Veznedar Kodu */
	tellarFinancialAccountId?: string | null;
	/** Açıklamalar */
	noteList?: string[] | null;
	/** Referans verilen ya da eklenen belgelere ilişkin bilgiler girilecektir. */
	receiptDocumentReferanceList?: BankReceiptOutboxDocumentReferanceModel[] | null;
	/** Dekont belgesine eklenmek istenen diğer bilgiler için bu eleman kullanılabilecektir. 
 Bu alan aşağıdaki kullanımlar için çoklanacaktır.
 VTA ve GVTA senaryolarında düzenlenen dekont belgesinin bu alanına, Vergi Tahsil Alındısı ya da Gümrük Vergisi Tahsil Alındısının tarihi ve belge numarası additionalDocNo alanına yazılmalıdır.DocumentDescription alanına “VTA” ya da “GVTA” yazılmalıdır. */
	additionalDocumentReferanceList?: BankReceiptOutboxAdditionalDocumentReferanceModel[] | null;
	bankReceiptAdditionalInfo?: BankReceiptOutboxDefinedAdditionalDocumentRefModel;
	supplierAgentAccount?: AgentAccountModel;
	accountCustomer: BankReceiptOutboxCustomerAccountModel;
	buyerCustomer?: BankReceiptOutboxCustomerAccountModel;
	taxRepresantativePartyModel?: BankReceiptOutboxTaxRepresantativePartyModel;
	/** Para birimi kodu */
	currencyCode: string;
	/** Kur bilgisi */
	currencyRate: number;
	/** Ödeme tarihi */
	paymentDate?: string | null;
	/** Ödeme Saati */
	paymentTime?: string | null;
	/** Valör tarihi */
	valueDate?: string | null;
	/** Valör saati */
	valueTime?: string | null;
	paymentMeans?: BankReceiptOutboxPaymentMeans;
	tax?: BankReceiptOutboxTaxTotalModel;
	legalMonetaryTotal?: BankReceiptOutboxLegalMonetaryTotal;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Özel oluşturulmuş belge görünümünüz var ise, bu belge görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm var mı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** Dekont Belge numarası ön ek bilgisidir.Örn:ADB Sistem tarafından belge numarası veriyorsa ve sistem üzerinde birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden belge numarası atanır. */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-döviz alım veya e-döviz satım belge numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Dekont belgesi Mysoft sistemlerine gönderilmeden önce şematron kontrolleri yapılması isteniyorsa bu parametre false geçilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Dekont detay bilgileri */
	bankReceiptDetailList?: BankReceiptOutboxDetailModel[] | null;
}

/**
 * Ödeme Kuruluşları ve Elektronik Para Kuruluşlarının işlemlerinde Dekont belgesinde bu alana Ödeme Bilgileri yazılacaktır.
 */
export interface BankReceiptOutboxPaymentMeans {
	/** paymentMeansCodeName */
	paymentMeansCodeName?: string | null;
	/** paymentMeansCodeValue */
	paymentMeansCodeValue?: string | null;
	/** paymentChannelCode */
	paymentChannelCode?: string | null;
	/** payerFinancialAccountId */
	payerFinancialAccountId?: string | null;
}

/**
 * e-Dekont belgesi sonuç sınıfı
 */
export interface BankReceiptOutboxResultModel {
	/** Evrensel Tekil Tanımlama Numarası(ETTN). Oluşturulan dekont belgesinin ettnsi */
	ettn?: string | null;
	/** Dekont Belgesi Numarası. Oluşturulan dekont belgesinin belge numarası */
	docNo?: string | null;
}

export interface BankReceiptOutboxResultModelResultModel {
	data?: BankReceiptOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Vergi tahsil alındı detayları
 */
export interface BankReceiptOutboxTaxRepresantativePartyModel {
	/** VTA senaryolu dekont için, Vergi Dönem bilgisi yazılır, GVTA senaryolu dekontlar için Gümrük kodu yazılır. */
	partyIdentificationId?: string | null;
	/** Gümrük Müdürlüğü Adı */
	partyName?: string | null;
	/** Gümrük Saymanlığı Adı */
	registrationName?: string | null;
	/** Gümrük Saymanlık Müdürlüğü kodu ve Vknsi */
	companyId?: string | null;
	/** Gümrük saymanlığının bağlı bulunduğu banka şube kodu */
	corporateRegistrationSchemeId?: string | null;
	/** Gümrük saymanlığının bağlı bulunduğu banka şube adı */
	corporateRegistrationSchemeName?: string | null;
	/** Ülke */
	countryName?: string | null;
	/** Şehir */
	cityName?: string | null;
	/** İlçe */
	citySubdivisionName?: string | null;
	/** Bina no */
	buildingNumber?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Kapı no */
	room?: string | null;
	/** Vergi dairesi adı */
	taxOfficeName?: string | null;
	/** Vergi dairesi kodu */
	taxOfficeCode?: string | null;
}

/**
 * Vergi detay bilgisi
 */
export interface BankReceiptOutboxTaxSubTotalModel {
	/** Verginin üzerinden hesaplandığı tutar (matrah) bilgisi girilecektir. */
	taxableAmount?: number;
	/** Hesaplanan vergi Tutarıdır. */
	taxAmount?: number;
	/** Sıra no */
	calculationSequenceNumeric?: number;
	/** Vergi Oran alanıdır */
	percent?: number;
	/** Vergi adı bilgisidir. */
	taxName?: string | null;
	/** Vergi Kodu alanıdır */
	taxTypeCode?: string | null;
}

/**
 * Vergi bilgisi
 */
export interface BankReceiptOutboxTaxTotalModel {
	/** Hesaplanan vergi Tutarıdır. */
	taxAmount?: number;
	/** Vergi detayları */
	taxSubTotal?: BankReceiptOutboxTaxSubTotalModel[] | null;
}

/**
 * Banka hareket listesi nesnesi
 */
export interface BankTransactionModel {
	/** Banka hareket tablosunun tekil alanıdır. */
	id?: number;
	/** Mysoft tarafından kayıt oluşturulma zamanıdır. */
	createdDate?: string;
	/** Hesap IBAN numarası bilgisidir. */
	iban?: string | null;
	/** Hesap numarası bilgisidir. */
	accountNo?: string | null;
	/** Hesap adı bilgisidir. */
	accountName?: string | null;
	/** Banka adı bilgisidir. */
	bankName?: string | null;
	/** Banka şube kodu bilgisidir. */
	bankBranchCode?: string | null;
	/** Banka şube adı bilgisidir. */
	bankBranchName?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Bakiye bilgisidir. */
	balance?: number;
	/** İşlem numarası bilgisidir. */
	docNo?: string | null;
	/** İşlem tarihi bilgisidir. */
	docDate?: string;
	/** İşleme ait referans numarası bilgisidir. */
	reference?: string | null;
	/** Banka hareket turu 1(borç),-1(alacak) */
	plusMinus?: number;
	/** İşlem tutarı bilgisidir. */
	amt?: number;
	/** Anlık bakiye bilgidir.(İşlemden sonrası bakiyedir.) */
	currentBalance?: number;
	/** İşlem açıklama bilgisidir. */
	note?: string | null;
	/** Karşı taraf iban */
	otherIBAN?: string | null;
	/** Karşı taraf vkn */
	otherVknTckn?: string | null;
	/** Karşı taraf ünvan */
	otherName?: string | null;
	/** Bankadan gelen işlem kodu bilgisidir. */
	bankTransactionCode?: string | null;
	/** Bankadan gelen işlem kodu bilgisidir. */
	bankTransactionDesc?: string | null;
	/** Mysoft tarafından belirlenen hareket tipi bilgisidir. */
	mysoftTransactionType?: string | null;
}

export interface BankTransactionModelQueryResultList {
	data?: BankTransactionModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Banka hareket liste sorgu model
 */
export interface BankTransactionRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Listelenecek hesap hareketlerinin başlangıç tarihidir. Bu parametre filtrelemeyi işlemin bankadaki oluşma tarihine göre yapar. Format : YYYY-MM-DD  time */
	startDate?: string | null;
	/** Listelenecek hesap hareketlerinin bitiş tarihidir. Bu parametre filtrelemeyi işlemin bankadaki oluşma tarihine göre yapar. Format : YYYY-MM-DD time */
	endDate?: string | null;
	/** Belirtilen iban bilgisine ait banka hareketleri getirilir. */
	iban?: string | null;
	/** Eğer true geçilirse daha önce okunmuş olan kayıtları getirmez. */
	isNotGetRead?: boolean | null;
}

/**
 * Banka hareketlerini okundu olarak işaretlenmesini sağlayan sınıf
 */
export interface BankTransactionSavedByCustomerRequestModel {
	/** Okundu olarak işaretlenmek istenen Banka hareket kayıtlarının Id listesi */
	bankTransactionIdList?: number[] | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

export interface BankaHesap {
	no?: string | null;
	aciklama?: string | null;
	subeAdi?: string | null;
	bankaAdi?: string | null;
}

/**
 * Temel istek modeli
 */
export interface BaseRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Adisyon belgesi Ubl XML gönderim sınıfı
 */
export interface BillDocumentForUblXmlModel {
	/** Döviz belgesinin ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	creditNoteTypeUblString?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-döviz alım veya e-döviz satım belge numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

/**
 * Adisyon başlık bilgileri
 */
export interface BillDocumentInfoModel {
	/** Adisyon kaydının mysofttaki Id'si */
	id?: number;
	/** Adisyon ETTN */
	billDocumentETTN?: string | null;
	/** Adisyon kaydının durumu */
	portalBillDocumentStatusText?: string | null;
	/** Adisyon Numarası */
	docNo?: string | null;
	/** Adisyon tarihi */
	docDate?: string;
	/** Hesap unvanı */
	accountName?: string | null;
	/** Hesap Adı */
	accountFirstName?: string | null;
	/** Hesap soyadı */
	accountFamilyName?: string | null;
	/** Hesap VKN/TCKN */
	accountVknTckn?: string | null;
	/** Para birimi */
	currencyCode?: string | null;
	/** Kur */
	currencyRate?: number;
	/** İskonto toplam tutar */
	allowanceTotalAmtTra?: number;
	/** Toplam tutar */
	lineExtensionAmtTra?: number;
	/** Ödenecek toplam tutar */
	payableAmtTra?: number;
	/** Yuvarlama tutarı */
	payableRoundingAmtTra?: number;
	/** Vergiler hariç tutar */
	taxExclusiveAmtTra?: number;
	/** Vergiler dahil toplam tutar */
	taxInclusiveAmtTra?: number;
	/** Vergi toplam tutar */
	taxTotalAmtTra?: number;
}

export interface BillDocumentInfoModelListResultModel {
	data?: BillDocumentInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * e-Adisyon toplam tutarları gösterir
 */
export interface BillDocumentLegalMonetaryTotal {
	/** Adisyon toplam tutarı */
	lineExtensionAmount?: number;
	/** Vergiler hariç TRY tutar */
	taxExclusiveAmount?: number;
	/** Vergiler dahil TRY tutar */
	taxInclusiveAmount?: number;
	/** Ödenecek tutar */
	payableAmount?: number;
	/** İskonto toplam tutar */
	allowanceChargeTotal?: number;
	/** Artırım toplam tutar */
	chargeAmountTotal?: number;
	/** Yuvarlama tutar */
	payableRoundingAmount?: number;
}

/**
 * e-Adisyon belgesi alıcı hesap bilgileri
 */
export interface BillDocumentOutboxCustomerAccountModel {
	/** Alıcı VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Alıcı unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Alıcı Adı */
	firstName?: string | null;
	/** Alıcı Soyadı */
	familyName?: string | null;
	/** Alıcı Uyruğu */
	nationality?: string | null;
	/** Alıcı vergi dairesi adı bilgisidir. */
	taxOfficeName?: string | null;
	/** Müşteri-Tedarikçi Ülke Adı alanıdır */
	countryName?: string | null;
	/** Müşteri-Tedarikçi Şehir Adı alanıdır */
	cityName?: string | null;
	/** İç kapı numarası bilgisidir. */
	room?: string | null;
	/** Meydan/bulvar/cadde adı bilgisidir. */
	streetName?: string | null;
	/** Blok Adı alanıdır */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina veya bloğa ait dış kapı numarası bilgisidir. */
	buildingNumber?: string | null;
	/** Semt alanıdır */
	citySubdivision?: string | null;
	/** Posta Kodu alanıdır */
	postalCode?: string | null;
	/** Kasaba/köy/mezra/mevkii bilgisidir. */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email1?: string | null;
	/** Alıcının web sayfası adresi bilgisidir. */
	webSiteUrl?: string | null;
}

/**
 * e-Adisyon belgesi satır bilgisi
 */
export interface BillDocumentOutboxDetailModel {
	/** Satır numarası */
	lineNo?: number;
	/** Miktar */
	creditedQuantity?: number;
	/** Satır toplam tutarı */
	lineExtensionAmount?: number;
	/** KDV tutarı */
	amtVat?: number;
	/** KDV oranı */
	vatRate?: number;
	/** İskonto Bilgisi */
	allowanceChargeList?: AllowanceCharge[] | null;
	/** Stok adı */
	itemName?: string | null;
	/** Birim fiyatı */
	unitPrice?: number;
	/** Birim kodu bilgisidir. ISO birim kodu yazılmalıdır.Adet için örn: 'C62' gönderilmesi gerekmektedir. */
	unitCode?: string | null;
}

/**
 * e-Adisyon Modeli
 */
export interface BillDocumentOutboxModel {
	/** Adisyon Belge numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,boş ise varsayılan ön ek değeriniz üzerinden belge numarası atanır. Örnek:ADB2021000000001, 3 hane ön ek, 4 hane yıl bilgisi, 9 belge numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** Adisyon Belge numarası ön ek bilgisidir.Örn:ADB Sistem tarafından belge numarası veriyorsa ve sistem üzerinde birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden belge numarası atanır. */
	prefix?: string | null;
	/** Evrensel Tekil Tanımlama Numarası(ETTN). Boş geçilir ise, sistem otomatik olarak bir ettn üretecektir. */
	ettn?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Düzenleme Tarihi */
	docDate: string;
	/** Düzenleme Zamanı */
	docTime?: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Döviz alım satım belgesi Mysoft sistemlerine gönderilmeden önce şematron kontrolleri yapılması isteniyorsa bu parametre false geçilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Özel oluşturulmuş belge görünümünüz var ise, bu belge görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm var mı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-döviz alım veya e-döviz satım belge numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** e-Adisyon not alanıdır. Birden fazla açıklama satırı yazılabilir. */
	notes?: NoteModel[] | null;
	/** Masa açılma başlangıç zamanı */
	sessionStartDateTime?: string | null;
	/** Masa açılma bitiş tarihi */
	sessionEndDateTime?: string | null;
	/** e-Adisyon belgesine eklenecek belge tipi bilgisidir. ETTN veya OKC_SERI_NO bilgilerinden birisi yazılabilir. */
	invoiceETTNType?: string | null;
	/** e-adisyon belgesine eklenen belge tipinin detay tipini belirtir. invoiceETTNType = ETTN için EFATURA yada EARSIV_FATURA, 
 invoiceETTNType = OKC_SERI_NO için SATIS_FISI yazılmalıdır. */
	invoiceETTNDescription?: string | null;
	/** invoiceETTNType = ETTN olması durumunda, Hizmet sürecinde adisyon belgesinden sonra e-fatura veya e-arşiv fatura oluşması durumunda (konaklama vs gibi) oluşacak olan faturanın ETTN bilgisi adisyon belgesi üzerinde yazılmalıdır. Adisyon süreci sonrasında oluşacak Faturaların ETTN leri adisyon üzerine bu alana yazılan fatura ETTN leri ile oluşturulması zorunludur. invoiceETTNType = OKC_SERI_NO olması durumunda ise OKC cihazının seri numarası yazılır. */
	invoiceETTN?: string | null;
	/** Yazar kasa fiş numarası */
	receiptNumber?: string | null;
	supplierAgentAccount?: AgentAccountModel;
	accountCustomer: BillDocumentOutboxCustomerAccountModel;
	/** Adisyon açılan masa numarası */
	tableNumber?: string | null;
	/** Adisyonu açan kullanıcı bilgisi */
	username?: string | null;
	/** Para birimi kodu */
	currencyCode?: string | null;
	/** Kur bilgisi */
	currencyRate?: number;
	legalMandatoryTotal?: BillDocumentLegalMonetaryTotal;
	/** e-Adisyon detay bilgisi */
	billDocumentDetailList?: BillDocumentOutboxDetailModel[] | null;
}

/**
 * e-Adisyon belgesi sonuç sınıfı
 */
export interface BillDocumentOutboxResultModel {
	/** Evrensel Tekil Tanımlama Numarası(ETTN). Oluşturulan adisyon belgesinin ettnsi */
	ettn?: string | null;
	/** Adisyon Belgesi Numarası. Oluşturulan adisyon belgesinin belge numarası */
	docNo?: string | null;
}

export interface BillDocumentOutboxResultModelResultModel {
	data?: BillDocumentOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden adisyonun durumunu belirten sınıftır.
 */
export interface BillDocumentOutboxStatusResultModel {
	/** Giden adisyon Id */
	id?: number;
	/** Adisyon ETTN */
	billDocumentETTN?: string | null;
	/** Adisyon Numarası */
	docNo?: string | null;
	/** Adisyon Durumları (BOS,IPTAL_EDILDI,TASLAK,ARSIV_KAYIT_KUYRUGUNDA,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,KABUL_KUYRUGUNDA,RED_KUYRUGUNDA,YANIT_BEKLENIYOR,KABUL,RED,HATA,ONAYLANDI(e-Arşiv faturalar için)) */
	billDocumentStatusText?: string | null;
	/** Hata açıklaması */
	errorDescription?: string | null;
}

export interface BillDocumentOutboxStatusResultModelListResultModel {
	data?: BillDocumentOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface BillDocumentOutboxStatusResultModelResultModel {
	data?: BillDocumentOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Defter listesi nesnesi
 */
export interface BookModel {
	/** Defter tablosunun tekil alanıdır. */
	id?: number;
	/** Defter Türü bilgisidir. */
	bookTypeEnumText?: string | null;
	/** Defter kontrol numarası bilgisidir. */
	controlNumber?: string | null;
	/** Defter yıl bilgisidir. */
	year?: number;
	/** Defter ay bilgisidir. */
	month?: number;
	/** Dönem başlangıç zamanı bilgisidir. */
	periodCoveredStart?: string;
	/** Dönem bitiş zamanı bilgisidir. */
	periodCoveredEnd?: string;
	/** Mali yıl başlangıç zamanı bilgisidir. */
	fisCalStartDate?: string;
	/** Mali yıl bitiş zamanı bilgisidir. */
	fisCalEndDate?: string;
	/** Şube numarası bilgisidir. */
	branchNumber?: string | null;
	/** Şube adı bilgisidir. */
	branchName?: string | null;
	/** Defter adı bilgisidir. */
	bookName?: string | null;
	/** Defter durumu bilgisidir. */
	portalBookStatusEnumText?: string | null;
	/** İkincil kopya gönderim durumu bilgisidir. */
	secondArchiveStatusEnumText?: string | null;
	/** Defter ETTN bilgisidir. */
	bookETTN?: string | null;
	/** Defterin ortak paket numarasıdır. */
	packageGuid?: string | null;
}

export interface BookModelQueryResultList {
	data?: BookModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Berat listesi nesnesi
 */
export interface BookPatentModel {
	/** Berat tablosunun tekil alanıdır. */
	id?: number;
	/** Berat Tür bilgisidir. */
	bookTypeEnumText?: string | null;
	/** Berat kontrol numarası bilgisidir. */
	controlNumber?: string | null;
	/** Berat yıl bilgisidir. */
	year?: number;
	/** Berat ay bilgisidir. */
	month?: number;
	/** Dönem başlangıç zamanı bilgisidir. */
	periodCoveredStart?: string;
	/** Dönem bitiş zamanı bilgisidir. */
	periodCoveredEnd?: string;
	/** Mali yıl başlangıç zamanı bilgisidir. */
	fisCalStartDate?: string;
	/** Mali yıl bitiş zamanı bilgisidir. */
	fisCalEndDate?: string;
	/** Şube numarası bilgisidir. */
	branchNumber?: string | null;
	/** Şube adı bilgisidir. */
	branchName?: string | null;
	/** Berat adı bilgisidir. */
	bookName?: string | null;
	/** Berat durum bilgisidir. */
	portalBookStatusEnumText?: string | null;
	/** İkincil kopya gönderim durumu bilgisidir. */
	secondArchiveStatusEnumText?: string | null;
	/** Berat ETTN bilgisidir. */
	bookETTN?: string | null;
	/** Berat ortak paket numarasıdır. */
	packageGuid?: string | null;
}

export interface BookPatentModelQueryResultList {
	data?: BookPatentModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Berat liste sorgu model
 */
export interface BookPatentRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Listelenecek beratların ay değeridir. */
	periodMonth?: number;
	/** Listelenecek beratların yıl değeridir. */
	periodYear?: number;
	/** Listelenecek beratların ortak paket numarasıdır. */
	packageGuid?: string | null;
}

/**
 * Yevmiye defteri belge referans listesi nesnesi
 */
export interface BookReceiptReferenceModel {
	/** Yevmiye defteri belge referanstablosunun tekil alanıdır. */
	id?: number;
	/** Defter tekil alanıdır. */
	bookId?: number;
	/** Defter yıl bilgisidir. */
	periodYear?: number;
	/** Defter ay bilgisidir. */
	periodMonth?: number;
	/** Defter adı bilgisidir. */
	documentName?: string | null;
	/** Defter şube bilgisidir. */
	tenantBranchName?: string | null;
	/** Muhasebe fişi numarası bilgisidir. */
	entryNumber?: string | null;
	/** Yevmiye madde numarasıdır. */
	entryNumberCounter?: number;
	/** Kontrol numarası bilgisidir. */
	uniqueId?: string | null;
	/** Firma adı bilgisidir. */
	tenantName?: string | null;
}

export interface BookReceiptReferenceModelQueryResultList {
	data?: BookReceiptReferenceModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Defter fişi referans listesi sorgu model
 */
export interface BookReceiptReferenceRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Listelenecek yevmiye defteri belge referans kayıtları ay değeridir. */
	periodMonth?: number;
	/** Listelenecek yevmiye defteri belge referans kayıtları yıl değeridir. */
	periodYear?: number;
	/** Listelenecek yevmiye defteri adıdır. */
	documentName?: string | null;
}

/**
 * Defter liste sorgu model
 */
export interface BookRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Listelenecek defterlerin ay değeridir. */
	periodMonth?: number;
	/** Listelenecek defterlerin yıl değeridir. */
	periodYear?: number;
	/** Listelenecek defterlerin ortak paket numarasıdır. */
	packageGuid?: string | null;
}

/**
 * Yevmiye fişi detay nesnesi.
 */
export interface BookTempEntryDetailModel {
	/** Yevmiye kaydı içerisinde yer alan borç alacak satırlarının özel bir sırası var ise girilir, herhangi bir şey verilmez ise kayıt gönderim sırasına göre sıralanacaktır. */
	lineNumber?: number;
	/** Kebir hesap numası bilgisidir. */
	accountMainID?: string | null;
	/** Kebir hesap adıdır. */
	accountMainDescription?: string | null;
	/** Yevmiye fişi detayında yer alan alt hesap numarasıdır. */
	accountSubID?: string | null;
	/** Yevmiye fişi detayında yer alan alt hesap adıdır. */
	accountSubDescription?: string | null;
	/** Yevmiye tarihidir. */
	postingDate?: string;
	/** Bu alana eğer yevmiye maddesine kaynak teşkil eden bir belge varsa bu belgenin türü yazılacaktır. Belge Türleri şu şekildedir: check: Çek, invoice: Fatura, order-customer: Müşteri Sipariş Belgesi, order-vendor: Satıcı Sipariş Belgesi, voucher: Senet, shipment: Navlun,receipt: Makbuz,other: Diğer */
	documentType?: string | null;
	/** Eğer DocumentType alanına "other" (diğer) girilmişse belgenin türü serbest metin olarak bu alana yazılacaktır. */
	documentTypeDescription?: string | null;
	/** Yevmiye maddesine kaynak teşkil eden belgenin numarası serbest biçimde yazılacaktır. */
	documentNumber?: string | null;
	/** Yevmiye maddesine kaynak teşkil eden belgenin numarası serbest biçimde yazılacaktır. */
	documentReference?: string | null;
	/** Yevmiye maddesine kaynak teşkil eden belgenin tarihi yazılacaktır. */
	documentDate?: string | null;
	/** Ödeme yöntemi yazılacaktır. */
	paymentMethod?: string | null;
	/** Yevmiye satırı açıklaması yazılacaktır. Zorunlu değildir. */
	detailComment?: string | null;
	/** Yevmiye fişi kaydı detayında Borç satırı için 'D', Alacak Satırı için 'C' girilir. */
	debitCreditCode?: string | null;
	/** Tutar bilgisi girilir. (Eksi değer gönderilmemelidir.) */
	amount?: number;
	/** Yevmiye kaydı para birimidir. Gönderilmez ise TRY alınır. */
	amountCurrency?: string | null;
	/** Yevmiye kaydı para birimidir. Gönderilmez ise TRY alınır. */
	amountExchangeRateDate?: string | null;
	/** Orjinal para birimi miktarıdır. */
	amountOriginalAmount?: number | null;
	/** Orjinal para birimidir. */
	amountOriginalCurrency?: string | null;
	/** Kaynak döviz kuru bilgisidir. */
	amountOriginalExchangeRateSource?: string | null;
	/** Kaynak döviz kuru açıklamasıdır. */
	amountOriginalExchangeRateComment?: string | null;
	/** Döviz kuru bilgisidir. */
	amountOriginalExchangeRate?: number | null;
}

/**
 * İlgili döneme ait yevmiye kaydı nesnesi.
 */
export interface BookTempEntryHeaderModel {
	/** İlgili dönem yevmiye kayıtları ortak gönderim numarasıdır. */
	packageGuid?: string | null;
	/** Yevmiye kaydını oluşturan kullanıcı bilgisidir. */
	enteredBy?: string | null;
	/** Yevmiye tarihidir. */
	enteredDate?: string;
	/** Kaydın dayandığı muhasebe fiş numarasıdır. (Yevmiye madde numarası değildir.) */
	entryNumber?: string | null;
	/** Açıklama bilgisidir. */
	entryComment?: string | null;
	/** Fiş Toplam borç tutarıdır. */
	totalDebit?: number;
	/** Fiş Toplam alacak tutarıdır. */
	totalCredit?: number;
	/** Yevmiye madde numarasıdır.Eğer bu alana bir şey girilmez ise Mysoft E-Defter uygulaması kendisi verecektir. */
	entryNumberCounter?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Yevmiye fişi detay nesnesi. */
	bookTempEntryDetailList?: BookTempEntryDetailModel[] | null;
}

/**
 * Yevmiye kaydı silme nesnesi.
 */
export interface BookTempEntryHeaderRemoveModel {
	/** İlgili dönem yevmiye kayıtları ortak gönderim numarasıdır. Kayıt silme işlemi için bu alan zorunludur. */
	packageGuid?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Defter Dönemi Paket Numarası Alma Request Nesnesi
 */
export interface BookTempPackageRequestModel {
	/** Gönderilmek istenen defter dönemi başlangıç tarihidir. */
	startDate: string;
	/** Gönderilmek istenen defter dönemi bitiş tarihidir. */
	endDate: string;
	/** Şubeli defter gönderilcek ise Şube Kodu değeridir. */
	batchNumber?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber: string;
}

export interface BooleanResultModel {
	data?: boolean;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İş ortağı kontör bilgisi sorgulama
 */
export interface BusinessPartnerDocumentCreditApiRequestModel {
	/** İş ortağı sorgulama tipi. 1 - Ana iş ortağı 2 - Alt İş ortağı */
	businessPartnerQueryType: number;
	/** Miktar tipi. 1-Adet,2-Megabyte,3-Tutar */
	quantityType: number;
}

/**
 * İş ortağı kontör bilgisi
 */
export interface BusinessPartnerDocumentCreditSummaryApiModel {
	/** Mysoft ürün kodu */
	productCode?: string | null;
	/** Mysoft ürün adı */
	productName?: string | null;
	/** Yükleme miktarı */
	creditQty?: number;
	/** Kullanılan miktar */
	usedCreditQty?: number;
	/** Kullanım süresi dolan miktar */
	expiredCreditQty?: number;
	/** Alt iş ortağına yüklenen miktar */
	subPartnerQty?: number;
	/** Kullanılabilir miktar */
	usableCreditQty?: number;
	/** İş ortağı VKN/TCKN */
	businessPartnerIdentifierNumber?: string | null;
	/** İş ortağı ünvanı */
	businessPartnerName?: string | null;
	/** Ana iş ortağı VKN/TCKN */
	mainBusinessPartnerIdentifierNumber?: string | null;
	/** Ana iş ortağı adı */
	mainBusinessPartnerName?: string | null;
}

export interface BusinessPartnerDocumentCreditSummaryApiModelListResultModel {
	data?: BusinessPartnerDocumentCreditSummaryApiModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İş ortağına tanımlı firmaların doküman kontör kullanım özeti
 */
export interface BusinessPartnerTenantDocumentUsageSummaryApiModel {
	/** Firma Pasiflik Durumu */
	isPassiveForTenant?: boolean;
	/** VKN / TCKN */
	identifierNumber?: string | null;
	/** Firma Unvanı */
	tenantName?: string | null;
	/** Toplam Kredi */
	creditCount?: number;
	/** Süresi Dolan Kredi */
	expiredCreditCount?: number;
	/** Kullanılan Kredi */
	usageCreditCount?: number;
	/** Toplam Kullanılan Adedi */
	totalUsageCreditCount?: number;
	/** Diğer Firmalara Verilen Havuzdan Kullanılan Kredi */
	otherGivePoolUsedCreditCount?: number;
	/** Diğer Firmalardan Alınan Havuzdan Kullanılan Kredi */
	otherTakePoolUsedCreditCount?: number;
	/** Net Kredi */
	netCreditCount?: number;
	/** Son Yüklenen Kredi */
	lastCreditQty?: number | null;
	/** Son Kredi Yükleme Tarihi */
	lastCreditDate?: string | null;
	/** Açıklama */
	sourceScreenStatus?: string | null;
}

export interface BusinessPartnerTenantDocumentUsageSummaryApiModelListResultModel {
	data?: BusinessPartnerTenantDocumentUsageSummaryApiModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * CashboxBalanceRequestModel
 */
export interface CashboxBalanceRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Tarih alanıdır. */
	docDate: string;
	/** Kasa kod başlangıç alanıdır. */
	cashBoxCodeS?: string | null;
	/** Kasa kod bitiş alanıdır. */
	cashBoxCodeE?: string | null;
}

/**
 * Kasa Bakiyesi sonuç nesnesi
 */
export interface CashboxBalanceResultModel {
	/** Kasa Id değeri */
	cashBoxId?: number;
	/** Kasa Kod bilgisidir. */
	cashBoxCode?: string | null;
	/** Kasa Ad bilgisidir. */
	cashBoxName?: string | null;
	/** Para Birimi bilgisidir. */
	currencyCode?: string | null;
	/** Borç Tutar bilgisidir. decimal precision : number(18,2) */
	debitAmt?: number;
	/** Alacak Tutar bilgisidir. decimal precision : number(18,2) */
	creditAmt?: number;
	/** Borç Tutar bilgisidir. decimal precision : number(18,2) */
	debitAmtTra?: number;
	/** Alacak Tutar bilgisidir. decimal precision : number(18,2) */
	creditAmtTra?: number;
	/** Net Tutar bilgisidir. decimal precision : number(18,2) */
	balanceAmt?: number;
	/** Net Tutar bilgisidir. decimal precision : number(18,2) */
	balanceAmtTra?: number;
}

export interface CashboxBalanceResultModelQueryResultList {
	data?: CashboxBalanceResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Kategori Modeli
 */
export interface CategoryApiModel {
	/** Kategori kodu bilgisidir. */
	categoryCode: string;
	/** Kategori adı bilgisidir. */
	categoryName: string;
	/** Kategori tanımının HEX renk kodu bilgisidir.İlgili kategorinin kullanıldığı süreçlerde kategori bilgisinin renkli gösterilmesini sağlar. Örnek: #D33A22, #2254D3 vb. 6 haneli kodlardır. Boş gönderilmesi halinde #D33A22 olarak kabul edilir. */
	color?: string | null;
	/** Kategorinin bağlı olduğu grup bilgisidir. */
	categoryGroupCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
	/** Kaydın pasif bilgisidir. String(Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
}

/**
 * Kategori Grup Modeli
 */
export interface CategoryGroupModel {
	/** Grup kodu bilgisidir. */
	categoryGroupCode: string;
	/** Grup adı bilgisidir. */
	categoryGroupName: string;
	/** Kullanım yeri bilgisidir. Oluşturulan grubun hangi süreçlerde kullanılabileceğini belirtir .String(Enum) ("7: Gelir Kartı","8: Gider Kartı","9: Cari Kartı","10: Stok Kartı") */
	categoryType?: number;
	/** Grup seviyesi bilgisidir. Oluşturulan gruba bağlı kategori tanımlarının hangi seviyede kullanıllanılacağını belirtir. String (Enum) ("1: Grup 1","2: Grup 2","3: Grup 3","4: Grup 4","5: Grup 5") */
	groupLevel?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
	/** Kaydın pasif bilgisidir. String(Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
}

/**
 * CategoryModel
 */
export interface CategoryModel {
	/** categoryName */
	categoryName?: string | null;
}

/**
 * ETK İzin durum sorgu sınıfı
 */
export interface ChangedETKConsentQueryDataModel {
	/** Kaydın MYSOFT tarafındaki Id değeridir. */
	id: number;
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_KARAR</code></li><li><code style="color: black;">IYS_CM</code></li><li><code style="color: black;">IYS_WEB</code></li><li><code style="color: black;">IYS_MOBIL</code></li><li><code style="color: black;">IYS_KISAMESAJ</code></li><li><code style="color: black;">IYS_EPOSTA</code></li><li><code style="color: black;">IYS_AHS_HAT_KAPATMA</code></li><li><code style="color: black;">IYS_WEB_YENI</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır. */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarihtir. */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder. */
	recipientType: string;
	/** İlgili toplu izin gönderiminin, sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">TASLAK</code></li><li><code style="color: black;">ISLENMEYI_BEKLIYOR</code></li><li><code style="color: black;">ISLENIYOR</code></li><li><code style="color: green;">IYSDE_KAYITLI</code></li><li><code style="color: black;">HATA</code></li></ul> */
	portalStatus: string;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama alanıdır. */
	note?: string | null;
	/** İzne ilişkin son güncelleme zamanıdır. */
	lastUpdateDate: string;
}

export interface ChangedETKConsentQueryDataModelListResultModel {
	data?: ChangedETKConsentQueryDataModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Çoklu Fatura mail durum sorgu sınıfı
 */
export interface CheckGeneralMailStatusMultipleInvoiceRequestModel {
	/** Fatura ETTN listesi */
	invoiceETTNList?: string[] | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * ChequeBillStatusRequestModel
 */
export interface ChequeBillStatusRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Vade başlangıç tarihi alanıdır. */
	dueDateS?: string | null;
	/** Vade bitiş tarihi alanıdır. */
	dueDateE?: string | null;
	/** Tarih alanıdır. */
	docDate: string;
	/** 1:Çek 2:Senet 3:Hepsi */
	chequeBillType?: number | null;
}

/**
 * ChequeBillStatusResultModel
 */
export interface ChequeBillStatusResultModel {
	/** Kart tipi bilgisidir. */
	chequeBillTypeEnumText?: string | null;
	/** Seri numarası bilgisidir. */
	serialNo?: string | null;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Belge tutarı bilgisidir. decimal precision : number(18,2) */
	amtTra?: number;
	/** Para birimi bilgisidir. */
	currencyCode?: string | null;
	/** TRY tutarı bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Güncel kur oranı bilgisidir. */
	currentCurrencyRate?: number;
	/** Güncel TRY tutar bilgisidir. */
	currenctAmt?: number;
	/** Pozisyon grup bilgisidir. */
	positionName?: string | null;
	/** Keşideci bilgisidir. */
	drawer?: string | null;
	/** Alınan verilen cari bilgisidir. */
	firstAccountName?: string | null;
	/** Banka bilgisidir. */
	bankName?: string | null;
	/** Banka şube bilgisidir. */
	bankBranchName?: string | null;
	/** Son işlem tarihi bilgisidir. */
	lastDocDate?: string;
}

export interface ChequeBillStatusResultModelQueryResultList {
	data?: ChequeBillStatusResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Şehir bilgisini tutar
 */
export interface CityModel {
	/** Şehir Id alanıdır */
	id: number;
	/** Şehir Kodu alanıdır */
	cityCode: string;
	/** Şehir Adı alanıdır */
	cityName: string;
	/** Şehirin bulunduğu Ülke'nin kodunu belirten alandır */
	countryCode: string;
}

export interface CityModelListResultModel {
	data?: CityModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * CollectionListRequestModel
 */
export interface CollectionListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Vade başlangıç tarihi alanıdır. */
	dueDateS?: string | null;
	/** Vade bitiş tarihi alanıdır. */
	dueDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Belge sınıfı adı (Kategori,Proje vs.).Birden fazla değer geçilebilir. */
	categoryName?: string | null;
}

/**
 * CollectionListResultModel
 */
export interface CollectionListResultModel {
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Alacak,borç durum bilgisidir. */
	plusMinusEnumText?: string | null;
	/** Cari hareketin oluştuğu kaynak bilgisidir. */
	transactionSource?: string | null;
	/** İşlem tipinin kod bilgisidir. */
	transactionTypeCode?: string | null;
	/** İşlem tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** Belge numarası bilgisidir. */
	docNo?: string | null;
	/** Belge tarihi bilgisidir. */
	docDate?: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Belge detay not bilgisidir. */
	note?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Firma para birimi cinsinden tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Firma para birimi cinsinden kalan tutar bilgisidir. decimal precision : number(18,2) */
	calcAmt?: number;
	/** Kalan gün sayısı bilgisidir. */
	lastDay?: number;
}

export interface CollectionListResultModelQueryResultList {
	data?: CollectionListResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * ConsentSMSRequestModel
 */
export interface ConsentSMSRequestModel {
	/** Gönderilecek telefon */
	telephone?: string | null;
	/** İzin alınacak isim */
	name?: string | null;
	/** İzin alınacak soyisim */
	surname?: string | null;
	/** Şablon kodu. Zorunlu alandır. Portalda tanımlı şablon kodlarından biri gönderilmelidir. */
	consentTemplateCode?: string | null;
	/** Alıcı türü. BIREYSEL, TACIR Değerlerinden biri olabilir. */
	recipientType?: string | null;
	/** Gönderilecek SMS'e URL eklenip eklenmeyeceğini belirtir. */
	smsWithoutUrl?: boolean;
	serviceKey?: string | null;
	serviceValue?: string | null;
	/** İzin gönderilecek, iletişim bilgilerinin, IYS'den kontrolünün yapılıp yapılmayacağını belirtir. */
	isControlIYS?: boolean;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İzin Durum Sonuç Model
 */
export interface ConsentStatusResultModel {
	/** Id */
	id?: number;
	/** IYS Marka Kodu */
	iysBrandCode?: string | null;
	/** İzin Tarihi */
	consentDate?: string | null;
	/** Alıcı */
	iysRecipient?: string | null;
	/** Portal Durum Açıklaması */
	iysPortalStatusGeneralEnumText?: string | null;
	/** Kaynak */
	iysSourceText?: string | null;
	/** Durum Açıklaması */
	iysStatusText?: string | null;
	/** Alıcı Tipi */
	iysRecipientTypeText?: string | null;
	/** IYS Tipi */
	iysTypeText?: string | null;
}

export interface ConsentStatusResultModelListResultModel {
	data?: ConsentStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İzin gönderim modeli
 */
export interface ConsentsRequestModel {
	/** Gönderim Tipi (EMAIL, SMS, EMAIL_SMS) */
	sendType?: string | null;
	/** Gönderilecek E-Mail */
	email?: string | null;
	/** Gönderilecek telefon */
	telephone?: string | null;
	/** Doğrulama için kullanılacak telefon */
	confirmTelephone?: string | null;
	/** Gönderim zamanı. Eski tarih olamaz. İleri bir tarih verilebilir. */
	sendTime?: string | null;
	/** İzin alınacak isim */
	name?: string | null;
	/** İzin alınacak soyisim */
	surname?: string | null;
	/** Şablon kodu. Zorunlu alandır. Portalda tanımlı şablon kodlarından biri gönderilmelidir. */
	consentTemplateCode?: string | null;
	/** Alıcı türü. BIREYSEL, TACIR Değerlerinden biri olabilir. */
	recipientType?: string | null;
	/** Gönderilecek SMS'e URL eklenip eklenmeyeceğini belirtir. */
	smsWithoutUrl?: boolean;
	serviceKey?: string | null;
	serviceValue?: string | null;
	/** İzin gönderilecek, iletişim bilgilerinin, IYS'den kontrolünün yapılıp yapılmayacağını belirtir. */
	isControlIYS?: boolean;
	/** Oluşacak izin kaydının onaylanması iFrame olarak mı yapılacak? */
	isIframe?: boolean;
	/** İlgili Mail yada Sms için daha önce gönderilmiş olan izin yanıtlandıysa, tekrar gönderim yapılmaması gerektiğini belirtir. */
	isNotSendToRepliedConsent?: boolean;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İzin gönderim sonuç modeli
 */
export interface ConsentsResultModel {
	/** izin referans anahtarı */
	referanceKey?: string | null;
	/** izin gönderim durumu */
	consentStatus?: number;
	/** izin gönderim durumu açıklaması */
	consentStatusDesc?: string | null;
	/** E-Mail izin bağlantı adresi */
	emailConsentUrl?: string | null;
	/** SMS izin bağlantı adresi */
	smsConsentUrl?: string | null;
}

export interface ConsentsResultModelResultModel {
	data?: ConsentsResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Ürün bazında sayaç modeli
 */
export interface CounterByProductModel {
	/** Ürün adı */
	productDescription?: string | null;
	/** Kullanılan kontör miktarı */
	usedCreditQty?: number;
}

/**
 * Sayaç bilgisi sorgulama
 */
export interface CounterInfoRequestModel {
	/** İlgili mükellefin VKN/TCKN'si */
	identifierNumber?: string | null;
}

/**
 * Ülke Bilgilerini tutar
 */
export interface CountryModel {
	/** Ülke tablosunun tekil alanıdır. */
	id: number;
	/** Ülke Kodu alanıdır */
	countryCode: string;
	/** Ülke Adı alanıdır */
	countryName: string;
}

export interface CountryModelListResultModel {
	data?: CountryModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Mutabakat oluşturma cevap modeli
 */
export interface CreateAccountAgreementResultModel {
	/** Mutabakat Kayıt Referansı */
	referanceKey?: string | null;
}

export interface CreateAccountAgreementResultModelResultModel {
	data?: CreateAccountAgreementResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Finans fiş oluşturma sonuç modeli
 */
export interface CreateFinanceResultModel {
	/** Oluşan finans fişinin idsi */
	financeId?: number;
}

export interface CreateFinanceResultModelResultModel {
	data?: CreateFinanceResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Kontör sorgu modeli
 */
export interface CreditRequestModel {
	/** İlgili mükellefin VKN/TCKN'si */
	identifierNumber?: string | null;
	/** Kontör yüklemelerinin geçerli olduğu ürün listesi. Boş geçilirse tüm ürünler için çalışır.
 Geçerli değerler şu şekilde olacaktır. 1(e-fatura), 2(e-Arşiv Fatura), 3 (e-irsaliye), 4 (e-Defter), 5 (e-SMM), 6 (E-MM),
 7 (e-Bilet), 8 (CRM), 9 (ön muhasebe), 10 (IYS), 12 (izin yönetimi), 13 (e-Döviz), 16 (e-Adisyon), 17 (mutabakat), 18 (e-arşiv fatura GIB) */
	productTypeList?: number[] | null;
	/** Biten yada süresi geçenler dahil tüm kredi yüklemelerini dön */
	isGetAllCreditInfo?: boolean | null;
}

/**
 * Para Birimi Bilgisini tutar
 */
export interface CurrencyModel {
	/** Para Birimi Id alanıdır */
	id?: number;
	/** Para Birimi standard ISO kodu alanıdır */
	currencyCode?: string | null;
	/** Para Birimi Adı alanıdır */
	currencyName?: string | null;
}

export interface CurrencyModelListResultModel {
	data?: CurrencyModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Taslak fatura silme parametreleri
 */
export interface DeleteInvoiceDraftModel {
	/** Silinmek istenen faturanın Id'si */
	invoiceId?: number;
	/** Silinmek istenen faturanın ETTN'si */
	invoiceETTN?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Sevk Adres Bilgileri
 */
export interface DeliveryAddressModel {
	/** Sevk Edilen Firma Adı */
	deliveryPartyAccountName?: string | null;
	/** Sevk Edilen Firma VKN/TCKN */
	deliveryPartyIdentifierNumber?: string | null;
	/** Sevk Edilen Firma Vergi Dairesi */
	deliveryPartyTaxOffice?: string | null;
	city: GeneralLookupNameModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
	taxOffice?: GeneralLookupNameModel;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** E-Posta alanıdır */
	email1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Posta kodu */
	postalCode: string;
	/** Kapı No alanıdır */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina No alanıdır */
	buildingNumber?: string | null;
	/** Kasaba veya köy alanıdır */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
}

/**
 * Teslim Şartı bilgilerini tutar
 */
export interface DeliveryTermModel {
	/** Teslim şartı tablosunun tekil alanıdır. */
	id: number;
	/** Teslim şartı kodu alanıdır */
	deliveryTermCode: string;
	/** Teslim şartı adı alanıdır */
	deliveryTermName: string;
}

export interface DeliveryTermModelListResultModel {
	data?: DeliveryTermModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface DemiryoluTasimaciligi {
	trenNo?: string | null;
	vagonNo?: string | null;
}

export interface DenizTasimaciligi {
	imoNo?: string | null;
	gemiAdi?: string | null;
}

/**
 * Fatura red istek sınıfı
 */
export interface DenyInvoiceRequestModel {
	/** Reddedilecek fatura ettn */
	invoiceETTN?: string | null;
	/** Red nedeni */
	rejectReason?: string | null;
	/** İşlem yapılacak Müşteri VKN, 
 Login olan kullanıcının varsayılan hesabından farklı bir hesapla işlem yapılmak isteniyorsa doldurulmalıdır */
	tenantIdentifierNumber?: string | null;
}

/**
 * İrsaliye sipariş bilgileri
 */
export interface DespatchAdviceOrderForOutbox {
	/** Sipariş numarası bilgisidir. */
	orderNo?: string | null;
	/** Satış Sipariş No bilgisidir. */
	salesOrderNo?: string | null;
	/** Sipariş tarihi bilgisidir. */
	orderDate?: string | null;
}

/**
 * İrsaliye Detay Model
 */
export interface DespatchDetailModel {
	/** Yeni bir stok kartı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewProduct?: boolean;
	product?: ProductBaseModel;
	/** Birim Kodu alanıdır */
	unitCode: string;
	/** Birim Adı alanıdır */
	unitName?: string | null;
	/** Miktar alanıdır. decimal precision : number(18,6) */
	qty: number;
	/** Birim Fiyat alanıdır. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Tutar alanıdır (Birim Fiyat * Miktar). decimal precision : number(18,2) */
	amtTra?: number;
}

/**
 * İrsaliye Detay Model
 */
export interface DespatchDetailResultModel {
	/** İrsaliye Id alanıdır. */
	despatchId?: number | null;
	/** İrsaliye Detay Id alanıdır. */
	id?: number | null;
	/** İrsaliye satır alanıdır. */
	lineNumber?: number | null;
	/** Fiyat listesi detayında yer alan mal/ hizmet tipi bilgisidir. String (Enum) ("1: Stok","2: Gelir","3: Gider","4: Demirbaş") */
	detailCardTypeEnumText?: string | null;
	/** Birim kodu alanıdır. */
	unitCode?: string | null;
	/** Ürün adı alanıdır. */
	manuelName?: string | null;
	/** Miktar alanıdır. */
	qty: number;
	/** Miktar alanıdır. */
	qtyPrm: number;
	/** Açıklama alanıdır. */
	note1?: string | null;
	/** Açıklama alanıdır. */
	note2?: string | null;
	/** Ürün kodu alanıdır. */
	cardCode?: string | null;
	/** Ürün adı alanıdır. */
	cardName?: string | null;
	/** Lot kodu alanıdır. */
	productLotCode?: string | null;
	/** Lot adı alanıdır. */
	productLotName?: string | null;
	/** modelName */
	modelName?: string | null;
	/** Alici Stok Kodu alanıdır */
	accountItemCode?: string | null;
	/** Alici Stok adı alanıdır */
	accountItemName?: string | null;
	/** Üretici kodu alanıdır. */
	producerCode?: string | null;
	/** Marka adı alanıdır. */
	brandName?: string | null;
	/** Seri no alanıdır. */
	serialNumber?: string | null;
	/** GTIP Kod alanıdır. */
	gtipCode?: string | null;
	/** Ürün barkod alanıdır */
	productBarcodeCode?: string | null;
	/** Sipariş detay Id */
	orderDetailId?: number | null;
}

/**
 * İrsaliyenin ön izlemesini gösterecek sınıf
 */
export interface DespatchForUblXmlDraftModel {
	/** İrsaliyenin ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	despatchAdviceTypeUblString?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Taslak belge gösteriminde eğer görüntü üzerinde TASLAK ifadesi yazılması isteniyorsa bu parametre true olarak geçilir. */
	isPrintDraftWatermark?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İrsaliyeyi UBL XML şeklinde göndermek için kullanılan sınıf
 */
export interface DespatchForUblXmlModel {
	/** İrsaliyenin ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	despatchAdviceTypeUblString?: string | null;
	/** Posta Kutusu alanıdır */
	pkAlias?: string | null;
	/** Gönderici Birim alanıdır */
	gbAlias?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Taslak olarak kaydet. bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

/**
 * İrsaliyeyi UBL XML şeklinde göndermek için kullanılan sınıf
 */
export interface DespatchForUblXmlTepeBilisimModel {
	/** İrsaliyenin Tepe Bilişime özel yapıdaki XML halidir. */
	xml?: string | null;
	/** İrsaliyenin gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Alıcı firmanın posta kutusu, alias bilgisidir.Birden fazla alıcı posta kutusu olan bir firmaya fatura gönderecekseniz, tercih ettiğiniz
 alias bilgisini girebilirsiniz boş bırakılması durumunda sistem tarafından ilk gerçerili bulduğu posta kutusunu otomatik atanır.E-Arşiv faturalarda bu alan boş bırakılmalıdır. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,boş bırakılması durumunda
 firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
}

/**
 * İrsaliye başlık bilgileri
 */
export interface DespatchHeaderInfoModel {
	/** İrsaliye Id alanıdır */
	id?: number;
	/** İrsaliye tipi string(Enum) "SEVK", "MATBUDAN" */
	eDespatchType?: string | null;
	/** İrsaliye belge durumu */
	despatchStatusText?: string | null;
	/** İrsaliyenin evrensel tekil tanımlama numarasıdır. */
	ettn?: string | null;
	/** İrsaliye numarası */
	docNo?: string | null;
	/** İrsaliye Tarihi alanıdır */
	docDate?: string;
	/** Posta kutusu bilgisi */
	pkAlias?: string | null;
	/** Gönderici birim bilgisi */
	gbAlias?: string | null;
	/** VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Mal/hizmet miktarı ile Mal/hizmet birim fiyatının çarpımı ile bulunan tutarlar toplamı girilir. */
	lineExtensionAmount?: number;
	/** Ödenecek tutar girilir. */
	payableAmount?: number;
	/** Belgenin sistemde oluşturulma zamanıdır */
	createDate?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Arşivlendimi */
	isArchived?: boolean;
	/** Zarf durum kodu */
	envelopeStatusCode?: string | null;
	/** Zarf durum açıklaması */
	envelopeStatusDesc?: string | null;
}

export interface DespatchHeaderInfoModelListPagingResultModel {
	data?: DespatchHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	totalCount?: number;
}

export interface DespatchHeaderInfoModelListResultModel {
	data?: DespatchHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Taşıma Bilgileri
 */
export interface DespatchInboxDelivery {
	deliveryAddress?: DespatchInboxDeliveryAddress;
	carrierParty?: DespatchPartyInfo;
	/** Fiili Sevk tarihi */
	actualDespatchDate?: string;
	/** Fiili Sevk zamanı */
	actualDespatchTime?: string;
}

/**
 * Sevk Adres bilgileri
 */
export interface DespatchInboxDeliveryAddress {
	/** Ülke adı */
	countryName?: string | null;
	/** Şehir adı */
	cityName?: string | null;
	/** İlçe adı */
	citySubdivisionName?: string | null;
	/** Posta bölgesi */
	postalZone?: string | null;
	/** Posta kutusu */
	postbox?: string | null;
}

/**
 * İrsaliye detay
 */
export interface DespatchInboxDetail {
	/** Satır No */
	lineNo?: number;
	/** Sevk miktar */
	deliveredQuantity?: number;
	/** Birim Kodu (ISO Birim Kodu) */
	unitCode?: string | null;
	/** Kalan gönderim miktarı */
	outstandingQuantity?: number;
	/** Fazla yükleme miktarı */
	oversupplyQuantity?: number;
	/** Kalan gönderim nedeni */
	outstandingReasonList?: string[] | null;
	/** Stok açıklaması */
	itemDescription?: string | null;
	/** Stok adı */
	itemName?: string | null;
	/** Satıcı Stok Kodu */
	sellersItemIdentificationId?: string | null;
	/** Alıcı Stok Kodu */
	buyersItemIdentificationId?: string | null;
	/** Üretici Stok Kodu */
	manufacturersItemIdentificationId?: string | null;
	/** Marka Adı */
	brandName?: string | null;
	/** Model Adı */
	modelName?: string | null;
	/** Birim fiyat */
	unitPrice?: number;
	/** Tutar */
	lineExtensionAmount?: number;
}

/**
 * Sürücü bilgisi
 */
export interface DespatchInboxDriverInfo {
	/** Sürücü Adı */
	driverName?: string | null;
	/** Sürücü Soyadı */
	driverSurname?: string | null;
	/** Sürücü kimlik numarası */
	driverNationalityId?: string | null;
}

/**
 * Gelen irsaliyenin zarf bilgilerini tutan sınıf
 */
export interface DespatchInboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** İrsaliye UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	despatchAdviceTypeStrAsZip?: string | null;
}

export interface DespatchInboxEnvelopeInfoResponseResultModel {
	data?: DespatchInboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gelen İrsaliye Modeli
 */
export interface DespatchInboxModel {
	/** Belge numarası */
	docNo?: string | null;
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye tarihi */
	docDate?: string | null;
	/** İrsaliye zamanı */
	docTime?: string | null;
	/** İrsaliye tipi */
	despatchAdviceTypeCode?: string | null;
	/** İrsaliye notları */
	noteList?: string[] | null;
	despatchSupplierParty?: DespatchPartyInfo;
	deliveryCustomerParty?: DespatchPartyInfo;
	buyerCustomerParty?: DespatchPartyInfo;
	sellerCustomerParty?: DespatchPartyInfo;
	originatorCustomerParty?: DespatchPartyInfo;
	shipment?: DespatchInboxShipment;
	/** İrsaliye detay listesi */
	despatchLineList?: DespatchInboxDetail[] | null;
}

export interface DespatchInboxModelResultModel {
	data?: DespatchInboxModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Sevk Bilgileri
 */
export interface DespatchInboxShipment {
	/** Taşıma yöntemi */
	shipmentStage?: DespatchInboxShipmentStage[] | null;
	delivery?: DespatchInboxDelivery;
}

/**
 * Taşıma yöntemi
 */
export interface DespatchInboxShipmentStage {
	/** Taşıma yöntemi kodu */
	transportModeCode?: string | null;
	/** Gelen irsaliyedeki araç plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılır. Örn: 34ABC12345 */
	licensePlate?: string | null;
	/** Sürücü bilgisi */
	driverInfo?: DespatchInboxDriverInfo[] | null;
}

/**
 * Gelen İrsaliye durum bilgi sınıfı
 */
export interface DespatchInboxStatusResultModel {
	/** Gelen İrsaliye Id */
	id?: number;
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye Numarası */
	docNo?: string | null;
	/** İrsaliye Durumları (BOS,IPTAL_EDILDI,TASLAK,ARSIV_KAYIT_KUYRUGUNDA,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,KABUL_KUYRUGUNDA,RED_KUYRUGUNDA,YANIT_BEKLENIYOR,KABUL,RED,HATA,ONAYLANDI(e-Arşiv faturalar için)) */
	despatchStatusText?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
}

export interface DespatchInboxStatusResultModelResultModel {
	data?: DespatchInboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * DespatchItemsRequestModel
 */
export interface DespatchItemsRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** İrsaliye tarihi başlangıç alanıdır. */
	docDateS?: string | null;
	/** İrsaliye tarihi bitiş alanıdır. */
	docDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Stok kodu başlangıç alanıdır. */
	productCodeS?: string | null;
	/** Stok kodu bitiş alanıdır. */
	productCodeE?: string | null;
	/** Hareket Tipi alanıdır. Integer(Enum) (Satış=1 - Alış=2 - Hepsi=5) */
	purchaseSales?: number | null;
}

/**
 * İrsaliye Detay sonuç model
 */
export interface DespatchItemsResultModel {
	/** İrsaliye detay tablosunun tekil alanıdır. */
	despatchDetailId?: number;
	/** İrsaliye tablosunun tekil alanıdır. */
	despatchId?: number;
	/** İrsaliye numarası bilgisidir. */
	docNo?: string | null;
	/** İrsaliye tarihi bilgisidir. */
	docDate?: string;
	/** Sevk tarihi bilgisidir. */
	actualReferalDate?: string;
	/** Cari tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** İrsaliye tipi bilgisidir. */
	transactionTypeName?: string | null;
	/** E-İrsaliye senaryo bilgisidir. */
	profileEnumText?: string | null;
	/** E-İrsaliye tipi bilgisidir. */
	edespatchTypeEnumText?: string | null;
	/** Para birimi kodu bilgisidir. */
	currencyCode?: string | null;
	/** Kur oranı bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Stok/Hizmet kartı tekil alanıdır. */
	productId?: number;
	/** Stok tipi bilgisidir. */
	productType?: string | null;
	/** Stok/Gelir/Gider kodu bilgisidir. */
	cardCode?: string | null;
	/** Stok/Gelir/Gider adı bilgisidir. */
	cardName?: string | null;
	/** Fatura girilen Stok/Gelir/Gider adı bilgisidir. */
	manuelName?: string | null;
	/** Birim adı bilgisidir. */
	unitCode?: string | null;
	/** Hareket miktarı bilgisidir. decimal precision : number(18,6) */
	qtyPrm?: number;
	/** Birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPrice?: number;
	/** Birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Tutar bilgisidir. decimal precision : number(18,2) */
	amtTra?: number;
	/** Net tutar bilgisidir. decimal precision : number(18,2) */
	netAmt?: number;
	/** Net tutar bilgisidir. decimal precision : number(18,2) */
	netAmtTra?: number;
	/** KDV oranı bilgisidir. decimal precision : number(18,2) */
	kdvTaxPercentage?: number;
	/** KDV tutarı bilgisidir. decimal precision : number(18,2) */
	kdvTaxAmt?: number;
	/** KDV tutarı bilgisidir. decimal precision : number(18,2) */
	kdvTaxAmtTra?: number;
	/** Diğer vergiler tutar bilgisidir. decimal precision : number(18,2) */
	otherTaxAmt?: number;
	/** Diğer vergiler tutar bilgisidir. decimal precision : number(18,2) */
	otherTaxAmtTra?: number;
	/** İskonto tutar bilgisidir. decimal precision : number(18,2) */
	allowanceAmt?: number;
	/** İskonto tutar bilgisidir. decimal precision : number(18,2) */
	allowanceAmtTra?: number;
}

export interface DespatchItemsResultModelQueryResultList {
	data?: DespatchItemsResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * İrsaliye Liste sorgu model
 */
export interface DespatchListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** İrsaliye başlangıç tarihi alanıdır. */
	docDateS?: string | null;
	/** İrsaliye bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Belge sınıfı adı (Kategori,Proje vs.).Birden fazla değer geçilebilir. */
	categoryName?: string | null;
	/** İrsaliye tipi.Birden fazla değer geçilebilir. */
	transactionType?: string | null;
	/** Satış=1 ; Alış=2; Birden fazla değer geçilebilir. */
	purchaseSales?: string | null;
}

/**
 * İrsaliye Liste Sorgu Sonuç model
 */
export interface DespatchListResultModel {
	/** İrsaliye tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** E-irsaliye tipinin ad bilgisidir. */
	eDespatchTypeEnumText?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** İrsaliye numarası bilgisidir. */
	docNo?: string | null;
	/** İrsaliye tarihi bilgisidir. */
	docDate?: string;
	/** Sevk tarihi bilgisidir. */
	actualReferalDate?: string;
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Depo kodu bilgisidir. */
	warehouseCode?: string | null;
	/** Depo adı bilgisidir. */
	warehouseName?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Kur bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Firma para birimi cinsinden toplam tutar bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	lineExtensionAmt?: number;
	/** Fatura para birimi cinsinden toplam tutar bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	lineExtensionAmtTra?: number;
	/** Firma para birimi cinsinden toplam iskonto tutarı bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	allowanceTotalAmt?: number;
	/** Fatura para birimi cinsinden toplam iskonto tutarı bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	allowanceTotalAmtTra?: number;
	/** Firma para birimi cinsinden vergiler toplamı bilgisidir. decimal precision : number(18,2) */
	taxAmt?: number;
	/** Fatura para birimi cinsinden vergiler toplamı bilgisidir. decimal precision : number(18,2) */
	taxAmtTra?: number;
	/** Firma para birimi cinsinden tevkifat toplamı bilgisidir. decimal precision : number(18,2) */
	witholdingTaxAmt?: number;
	/** Fatura para birimi cinsinden tevkifat toplamı bilgisidir. decimal precision : number(18,2) */
	witholdingTaxAmtTra?: number;
	/** Firma para birimi cinsinden ödenecek tutar bilgisidir. decimal precision : number(18,2) */
	payableAmt?: number;
	/** İrsaliye para birimi cinsinden ödenecek tutar bilgisidir. decimal precision : number(18,2) */
	payableAmtTra?: number;
}

export interface DespatchListResultModelQueryResultList {
	data?: DespatchListResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * İrsaliye
 */
export interface DespatchModel {
	/** İrsaliye Id değeri */
	id: number;
	/** İrsaliye servisinin amaçladığı hizmet tipi değeri bilgisini verir. */
	recordTargetTable: string;
	/** İrsaliye tipi string(Enum) "SEVK", "MATBUDAN" */
	eDespatchType: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Ön ek bilgisidir. */
	prefix?: string | null;
	/** İrsaliye belge tarihi alanıdır */
	docDate: string;
	/** İrsaliye belge saati alanıdır */
	docTime: string;
	/** Sevk Tarihi alanıdır */
	actualReferalDate: string;
	/** Sevk Saati alanıdır */
	actualReferalTime: string;
	/** Matbu Seri alanıdır */
	printedSerial?: string | null;
	/** Matbu No alanıdır */
	printedSerialNo?: string | null;
	/** Vade tarihi alanıdır */
	dueDate?: string;
	/** Döviz tipi bilgisidir. */
	currencyCode?: string | null;
	/** Döviz kuru bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Sipariş No alanıdır */
	orderNo?: string | null;
	/** Sipariş Tarihi alanıdır */
	orderDate?: string;
	/** Müşteri posta kutusu bilgisidir.Eğer alan boş bırakılır ve gönderilen belge E-irsaliye ise, posta kutusu otomatik atanır. */
	pkAlias?: string | null;
	/** Yeni bir müşteri kartı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewAccount?: boolean;
	/** İnternet Satışımı? */
	isInternetSales?: boolean;
	deliveryAccount?: AccountModel;
	account?: AccountBaseModel;
	sellerAccount?: AccountBaseModel;
	originatorAccount?: AccountBaseModel;
	cargoAccount?: AccountBaseModel;
	/** Kargo numarası alanıdır */
	shipmentNumber?: string | null;
	/** Sürücü VKN/TCKN bilgisidir. */
	driverIdentifierNumber?: string | null;
	/** Sürücü ad soyad bilgisidir. */
	driverName?: string | null;
	/** Sürücü telefon bilgisidir. */
	driverPhone?: string | null;
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. PLAKA için Örn: 34ABC12345 YABANCIPLAKA için Örn: ABC123 */
	lisancePlate?: string | null;
	/** Dorse bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. DORSE için Örn: 34ABC12345 YABANCIDORSE için Örn: ABC123 */
	trailerNo?: string | null;
	/** Teslim eden ad soyad bilgisidir. */
	despatchContact?: string | null;
	/** İrsaliye Detay modelidir */
	despatchDetail: DespatchDetailModel[];
}

/**
 * Giden İrsaliye Alıcı Bilgisi
 */
export interface DespatchOutboxDeliveryAccountModel {
	/** Alıcı unvan adı veya ad-soyad bilgisidir. */
	accountName: string;
	/** Alıcı VKN/TCKN bilgisidir. */
	identifierNumber: string;
	city: GeneralLookupNameModel;
	country: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision: string;
	taxOffice?: GeneralLookupNameModel;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** E-Posta alanıdır */
	email1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Posta kodu */
	postalCode: string;
	/** Kapı No alanıdır */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina No alanıdır */
	buildingNumber?: string | null;
	/** Kasaba veya köy alanıdır */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Web Sitesi alanıdır */
	webSiteUrl?: string | null;
	/** Nace Kodu alanıdır */
	naceCode?: string | null;
}

/**
 * Giden İrsaliye Detay Model
 */
export interface DespatchOutboxDetailModel {
	product?: ProductBaseModelForOutbox;
	/** Alıcı mal veya hizmet kodu bilgisidir. */
	buyerProductCode?: string | null;
	/** Üretici mal veya hizmet kodu bilgisidir. */
	manufacturerProductCode?: string | null;
	/** Marka Adı alanıdır */
	brandName?: string | null;
	/** Model Adı alanıdır */
	modelName?: string | null;
	/** Not  alanıdır */
	notes?: NoteModel[] | null;
	/** Birim Kodu alanıdır */
	unitCode: string;
	/** Miktar alanıdır. decimal precision : number(18,6) */
	qty: number;
	/** Birim Fiyat alanıdır. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Tutar alanıdır (Birim Fiyat * Miktar). decimal precision : number(18,2) */
	amtTra?: number;
	/** Para birimi */
	currencyCode?: string | null;
	/** HKS Künye no */
	hksTagNumber?: string | null;
	/** Stok için ek bilgiler */
	additionalItemIdentification?: IdentificationType[] | null;
}

/**
 * Giden irsaliyenin zarf bilgilerini tutan sınıf
 */
export interface DespatchOutboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** İrsaliye UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	despatchAdviceTypeStrAsZip?: string | null;
}

export interface DespatchOutboxEnvelopeInfoResponseResultModel {
	data?: DespatchOutboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden irsaliye nesnesi
 */
export interface DespatchOutboxModel {
	/** İrsaliye tipi string(Enum) "SEVK", "MATBUDAN" */
	eDespatchType: string;
	/** İrsaliye Profil bilgisi (TEMELIRSALIYE,IDISIRSALIYE,HKSIRSALIYE) */
	profile?: string | null;
	/** İrsaliye numarası ön ek bilgisidir.Örn:IRS sistem tarafından irsaliye numarası veriyorsa ve sistem üzerinde
 birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.
 Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden irsaliye numarası atanır. */
	prefix?: string | null;
	/** İrsaliyenin evrensel tekil tanımlama numarasıdır.
 İrsaliyeyi ilk gönderimde bu alanı boş geçebilirsiniz veya kendiniz bu alanı gönderebilirsiniz. */
	ettn?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** İrsaliye numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,
 boş ise varsayılan ön ek değeriniz üzerinden irsaliye numarası atanır.
 Örnek:IRS2019000001220, 3 hane ön ek, 4 hane yıl bilgisi, 9 irsaliye numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** İrsaliye belge tarihi alanıdır */
	docDate: string;
	/** İrsaliye belge saati alanıdır */
	docTime: string;
	/** Sevk Tarihi alanıdır */
	actualReferalDate: string;
	/** Sevk Saati alanıdır */
	actualReferalTime: string;
	/** Döviz tipi bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir.'TRY' olması durumunda1 değeri girilmelidir. */
	currencyRate: number;
	/** Alıcı posta kodu, muhtelif müşteriler için (e-irsaliye müşterisi olmayan) alias değeri urn:mail:irsaliyepk@gib.gov.tr olarak gönderilmelidir. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,
 boş bırakılması durumunda firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
	/** Taslak olarak kaydet. Bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	supplierPartyIdentifer?: PartyIdentifierModel;
	supplierAgentAccount?: AgentAccountModel;
	deliveryAccount: DespatchOutboxDeliveryAccountModel;
	deliveryAgentAccount?: AgentAccountModel;
	account?: AccountBaseForOutboxModel;
	sellerAccount?: AccountBaseForOutboxModel;
	originatorAccount?: AccountBaseForOutboxModel;
	cargoAccount?: AccountBaseForOutboxModel;
	deliveryAddress: DeliveryAddressModel;
	/** Kargo numarası bilgisidir. */
	shipmentNumber?: string | null;
	/** Sürücü VKN/TCKN bilgisidir. */
	driverIdentifierNumber?: string | null;
	/** Sürücü ad bilgisidir. */
	driverName?: string | null;
	/** Sürücü soyad bilgisidir. */
	driverSurname?: string | null;
	/** Sürücü telefon bilgisidir. */
	driverPhone?: string | null;
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. PLAKA için Örn: 34ABC12345 YABANCIPLAKA için Örn: ABC123 */
	lisancePlate?: string | null;
	/** Plaka bilgisinin schemaId bilgisidir. boş gönderildiğinde varsayılan değer PLAKA dır. Geçerli Değerler : PLAKA, YABANCIPLAKA */
	lisancePlateSchemaId?: string | null;
	/** Dorse bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. DORSE için Örn: 34ABC12345 YABANCIDORSE için Örn: ABC123 */
	trailerNo?: string | null;
	/** Dorse bilgisinin SchemaId bilgisidir. boş gönderildiğinde varsayılan değer DORSE dır. Geçerli Değerler : DORSE, YABANCIDORSE */
	trailerNoSchemaId?: string | null;
	/** Dorse plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. DORSEPLAKA için Örn: 34ABC12345 YABANCIDORSEPLAKA için Örn: ABC123 */
	trailerPlate?: string | null;
	/** Dorse plaka bilgisinin SchemaId bilgisidir. boş gönderildiğinde varsayılan değer DORSEPLAKA dır. Geçerli Değerler : DORSEPLAKA, YABANCIDORSEPLAKA */
	trailerPlateSchemaId?: string | null;
	/** Not  alanıdır */
	notes?: NoteModel[] | null;
	/** Teslim eden ad soyad bilgisidir. */
	despatchContact?: string | null;
	/** Teslim alan ad soyad bilgisidir. */
	deliveryContact?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan irsaliye dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Özel oluşturulmış irsaliye görünümünüz var ise, bu irsaliye görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak irsaliye gönderilir. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Sipariş bilgileri listesi */
	orderList?: DespatchAdviceOrderForOutbox[] | null;
	/** Faturaya eklenmek istenen ek bilgiler bu kısımda yazılmalıdır. */
	additionalDocumentRef?: AdditionalDocumentRef[] | null;
	/** İrsaliye Detay modelidir */
	despatchDetail: DespatchOutboxDetailModel[];
}

/**
 * Taslak Giden irsaliye nesnesi
 */
export interface DespatchOutboxModelForDraft {
	/** İrsaliye tipi string(Enum) "SEVK", "MATBUDAN" */
	eDespatchType: string;
	/** İrsaliye Profil bilgisi (TEMELIRSALIYE,IDISIRSALIYE,HKSIRSALIYE) */
	profile?: string | null;
	/** İrsaliye numarası ön ek bilgisidir.Örn:IRS sistem tarafından irsaliye numarası veriyorsa ve sistem üzerinde
 birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.
 Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden irsaliye numarası atanır. */
	prefix?: string | null;
	/** İrsaliyenin evrensel tekil tanımlama numarasıdır.
 İrsaliyeyi ilk gönderimde bu alanı boş geçebilirsiniz veya kendiniz bu alanı gönderebilirsiniz. */
	ettn?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** İrsaliye numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,
 boş ise varsayılan ön ek değeriniz üzerinden irsaliye numarası atanır.
 Örnek:IRS2019000001220, 3 hane ön ek, 4 hane yıl bilgisi, 9 irsaliye numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** İrsaliye belge tarihi alanıdır */
	docDate: string;
	/** İrsaliye belge saati alanıdır */
	docTime: string;
	/** Sevk Tarihi alanıdır */
	actualReferalDate: string;
	/** Sevk Saati alanıdır */
	actualReferalTime: string;
	/** Döviz tipi bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir.'TRY' olması durumunda1 değeri girilmelidir. */
	currencyRate: number;
	/** Alıcı posta kodu, muhtelif müşteriler için (e-irsaliye müşterisi olmayan) alias değeri urn:mail:irsaliyepk@gib.gov.tr olarak gönderilmelidir. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,
 boş bırakılması durumunda firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
	/** Taslak olarak kaydet. Bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	supplierPartyIdentifer?: PartyIdentifierModel;
	supplierAgentAccount?: AgentAccountModel;
	deliveryAccount: DespatchOutboxDeliveryAccountModel;
	deliveryAgentAccount?: AgentAccountModel;
	account?: AccountBaseForOutboxModel;
	sellerAccount?: AccountBaseForOutboxModel;
	originatorAccount?: AccountBaseForOutboxModel;
	cargoAccount?: AccountBaseForOutboxModel;
	deliveryAddress: DeliveryAddressModel;
	/** Kargo numarası bilgisidir. */
	shipmentNumber?: string | null;
	/** Sürücü VKN/TCKN bilgisidir. */
	driverIdentifierNumber?: string | null;
	/** Sürücü ad bilgisidir. */
	driverName?: string | null;
	/** Sürücü soyad bilgisidir. */
	driverSurname?: string | null;
	/** Sürücü telefon bilgisidir. */
	driverPhone?: string | null;
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. PLAKA için Örn: 34ABC12345 YABANCIPLAKA için Örn: ABC123 */
	lisancePlate?: string | null;
	/** Plaka bilgisinin schemaId bilgisidir. boş gönderildiğinde varsayılan değer PLAKA dır. Geçerli Değerler : PLAKA, YABANCIPLAKA */
	lisancePlateSchemaId?: string | null;
	/** Dorse bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. DORSE için Örn: 34ABC12345 YABANCIDORSE için Örn: ABC123 */
	trailerNo?: string | null;
	/** Dorse bilgisinin SchemaId bilgisidir. boş gönderildiğinde varsayılan değer DORSE dır. Geçerli Değerler : DORSE, YABANCIDORSE */
	trailerNoSchemaId?: string | null;
	/** Dorse plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. DORSEPLAKA için Örn: 34ABC12345 YABANCIDORSEPLAKA için Örn: ABC123 */
	trailerPlate?: string | null;
	/** Dorse plaka bilgisinin SchemaId bilgisidir. boş gönderildiğinde varsayılan değer DORSEPLAKA dır. Geçerli Değerler : DORSEPLAKA, YABANCIDORSEPLAKA */
	trailerPlateSchemaId?: string | null;
	/** Not  alanıdır */
	notes?: NoteModel[] | null;
	/** Teslim eden ad soyad bilgisidir. */
	despatchContact?: string | null;
	/** Teslim alan ad soyad bilgisidir. */
	deliveryContact?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan irsaliye dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Özel oluşturulmış irsaliye görünümünüz var ise, bu irsaliye görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak irsaliye gönderilir. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Sipariş bilgileri listesi */
	orderList?: DespatchAdviceOrderForOutbox[] | null;
	/** Faturaya eklenmek istenen ek bilgiler bu kısımda yazılmalıdır. */
	additionalDocumentRef?: AdditionalDocumentRef[] | null;
	/** İrsaliye Detay modelidir */
	despatchDetail: DespatchOutboxDetailModel[];
	/** Taslak belge gösteriminde eğer görüntü üzerinde TASLAK ifadesi yazılması isteniyorsa bu parametre true olarak geçilir. */
	isPrintDraftWatermark?: boolean | null;
}

/**
 * İrsaliye dönüş bilgisi
 */
export interface DespatchOutboxResultModel {
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye belge numarası */
	docNo?: string | null;
}

export interface DespatchOutboxResultModelResultModel {
	data?: DespatchOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İrsaliye dönüş bilgisi
 */
export interface DespatchOutboxResultTepeBilisimModel {
	/** İşlem gören irsaliye bilgileri */
	tepeResult?: DespatchOutboxResultModel[] | null;
}

export interface DespatchOutboxResultTepeBilisimModelResultModel {
	data?: DespatchOutboxResultTepeBilisimModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden İrsaliye Durum Sınıfı
 */
export interface DespatchOutboxStatusResultModel {
	/** Giden İrsaliye Id */
	id?: number;
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye Numarası */
	docNo?: string | null;
	/** İrsaliye Durumları (BOS,IPTAL_EDILDI,TASLAK,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,YANIT_BEKLENIYOR,YANITLANDI,ISLENDI,HATA) */
	despatchStatusText?: string | null;
	/** Zarf UUID */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
	/** Hatalı zarfların tekrar gönderim deneme sayısı */
	tryCount?: number;
}

export interface DespatchOutboxStatusResultModelListResultModel {
	data?: DespatchOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface DespatchOutboxStatusResultModelResultModel {
	data?: DespatchOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İrsaliye hesap bilgisi
 */
export interface DespatchPartyInfo {
	/** VKN/TCKN bilgisi */
	identifierNumber?: string | null;
	/** Unvan */
	partyName?: string | null;
	/** Hesap Adı */
	customerName?: string | null;
	/** Hesap Soyadı */
	customerSurname?: string | null;
	/** Ülke adı */
	countryName?: string | null;
	/** Şehir adı */
	cityName?: string | null;
	/** İlçe adı */
	citySubdivisionName?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Bina Adı */
	buildingName?: string | null;
	/** Bina numarası */
	buildingNumber?: string | null;
	/** Blok adı */
	blockName?: string | null;
	/** Daire numarası */
	room?: string | null;
	/** Posta kutusu */
	postbox?: string | null;
	/** MERSİS Numarası */
	mersisNo?: string | null;
	/** Email */
	email?: string | null;
	/** Telefon */
	telephone?: string | null;
	/** Vergi dairesi adı */
	taxOfficeName?: string | null;
	/** Web adresi */
	websiteURL?: string | null;
}

/**
 * İlgili Tarihler için gelen fatura listesini veren parametre sınıfı
 */
export interface DespatchResultListForPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi YYYY-MM-DD olarak girilmelidir. */
	startDate?: string | null;
	/** Bitiş Tarihi YYYY-MM-DD olarak girilmelidir. */
	endDate?: string | null;
	/** İlgili İrsaliyenin ETTN Numarasıdır. */
	despatchETTN?: string | null;
	/** transactionTypeName. */
	transactionTypeName?: string | null;
}

/**
 * İrsaliye
 */
export interface DespatchResultModel {
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** İrsaliye tarihi bilgisidir. */
	docDate: string;
	/** İrsaliye belge saati alanıdır */
	docTime: string;
	/** İrsaliye numarası bilgisidir. */
	docNo?: string | null;
	/** İrsaliye tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** Alıcı VKN / TCKN alanıdır. */
	deliveryAccountVknTckn?: string | null;
	/** Alıcı Firma Id */
	deliveryAccountId?: number | null;
	/** Alıcı Unvan alanıdır. */
	deliveryAccountName?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Kur bilgisidir. decimal precision : number(18,6) */
	currencyRate: number;
	/** İrsaliye Vade Günü */
	dueDay?: number | null;
	/** İrsaliye Vade Tarihi */
	dueDate?: string | null;
	/** İrsaliye ETTN numarası alanıdır */
	despatchETTN?: string | null;
	/** Alıcı ülke alanıdır */
	deliveryAccountCountryName?: string | null;
	/** Alıcı şehir alanıdır */
	deliveryAccountCityName?: string | null;
	/** Alıcı adı alanıdır */
	deliveryAccountFirstName?: string | null;
	/** Alıcı soyadı alanıdır */
	deliveryAccountFamilyName?: string | null;
	/** Alıcı posta kodu alanıdır */
	deliveryAccountPostbox?: string | null;
	/** Alıcı kapı numarası alanıdır. */
	deliveryAccountRoom?: string | null;
	/** Alıcı sokak adı alanıdır */
	deliveryAccountStreetName?: string | null;
	/** Alıcı blok adı alanıdır */
	deliveryAccountBlockName?: string | null;
	/** Alıcı bina adı alanıdır */
	deliveryAccountBuildingName?: string | null;
	/** Alıcı bina no alanıdır */
	deliveryAccountBuildingNumber?: string | null;
	/** Alıcı Semt adı alanıdır. */
	deliveryAccountCitySubdivisionName?: string | null;
	/** Alıcı Posta Kodu alanıdır */
	deliveryAccountPostalCode?: string | null;
	/** Alıcı bölge adı alanıdır. */
	deliveryAccountRegion?: string | null;
	/** Alıcı mahalle adı alanıdır. */
	deliveryAccountDistrict?: string | null;
	/** Alıcı telefon alanıdır. */
	deliveryAccountTelephone1?: string | null;
	/** Alıcı fax alanıdır. */
	deliveryAccountFax1?: string | null;
	/** Alıcı email alanıdır. */
	deliveryAccountEmail1?: string | null;
	/** Alıcı vergi dairesi alanıdır. */
	deliveryAccountTaxOfficeName?: string | null;
	/** İrsaliye taşıma yolu kod alanıdır. */
	transportModeCode?: string | null;
	/** İrsaliye taşıma yolu alanıdır. */
	transportModeName?: string | null;
	/** İthalat İhracatta kullanılan teslimat şartları bilgisidir. Standart kod değerleri girilmelidir.(CFR,CIF,CIP,CPT,DAF,DDP,DDU,DEQ,DES,EXW,FAS,FCA,FOB,DAP,DAT) */
	deliveryTermCode?: string | null;
	/** İthalat İhracatta kullanılan teslimat şartları bilgisidir. Standart kod değerleri girilmelidir.(CFR,CIF,CIP,CPT,DAF,DDP,DDU,DEQ,DES,EXW,FAS,FCA,FOB,DAP,DAT) */
	deliveryTermName?: string | null;
	/** Alıcı Web sitesi alanıdır. */
	deliveryAccountWebSiteURL?: string | null;
	/** Sevk tarihi bilgisidir. */
	actualReferalDate?: string | null;
	/** Sevk saati bilgisidir. */
	actualReferalTime?: string | null;
	/** Matbu Seri alanıdır */
	printedSerial?: string | null;
	/** Matbu Seri No alanıdır */
	printedSerialNo?: string | null;
	/** Depo Kodu bilgisidir. */
	warehouseCode?: string | null;
	/** Depo adı bilgisidir. */
	warehouseName?: string | null;
	/** Satıcı Unvan Id */
	sellerAccountId?: number | null;
	/** Satıcı Unvan alanıdır */
	sellerAccountName?: string | null;
	/** Brüt Ağırlık alanıdır */
	grossWeightMeasure: number;
	/** Net Ağırlık alanıdır */
	netWeightMeasure: number;
	/** Brüt Hacim alandır */
	grossVolumeMeasure: number;
	/** Net Hacim alanıdır. */
	netVolumeMeasure: number;
	/** Ünite miktarı alanıdır. */
	totalTransportHandlingUnitQuantity: number;
	/** Beyan Gümrük değeri alanıdır. */
	declaredCustomsValueAmount: number;
	/** Beyan Taşıma Ücreti alanıdır. */
	declaredForCarriageValueAmount: number;
	/** Gtip Kıymet Bedeli alanıdır */
	declaredStatisticsValueAmount: number;
	/** FOB Değeri alanıdır. */
	freeOnBoardValueAmount: number;
	/** Taşıma Özel Not alanıdır. */
	specialInstructions?: string | null;
	/** Sürücü adı alanıdır. */
	driverFirstName?: string | null;
	/** Sürücü Telefon alanıdır. */
	driverPhone?: string | null;
	/** Araç plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılır. Örn: 34ABC12345 */
	lisancePlate?: string | null;
	/** Kargo Firması ad alanıdır. */
	cargoAccountName?: string | null;
	/** Kargo No alanıdır. */
	shipmentNumber?: string | null;
	/** Sigorta Tutarı alandıır. */
	insuranceValueAmount: number;
	/** Satış=1 ; Alış=2; Birden fazla değer geçilebilir. */
	purchaseSales: number;
	purchaseSalesEnumText?: string | null;
	/** Sürücü VKN/TCKN bilgisidir. */
	driverIdentifierNumber?: string | null;
	/** Dorse plaka bilgisidir. */
	trailerNo?: string | null;
	/** Teslimat yapılacak ülke adı alanıdır. */
	deliveryCountryName?: string | null;
	/** Teslimat yapılacak semt adı alanıdır. */
	deliveryCitySubdivisionName?: string | null;
	/** Teslimat yapılacak bina adı alanıdır. */
	deliveryBuildingName?: string | null;
	/** Teslimat posta kodu alanıdır. */
	deliveryPostalCode?: string | null;
	/** Kargo bedeli alanıdır */
	transportationAmtTra: number;
	/** Teslimat yapılacak bina no alanıdır. */
	deliveryBuildingNumber?: string | null;
	/** Teslimat yapılacak sokak adı alanıdır. */
	deliveryStreetName?: string | null;
	/** Teslimat yapılacak şehir adı alanıdır. */
	deliveryCityName?: string | null;
	/** Kargo no alanıdır. */
	cargoNumber?: string | null;
	/** Alıcı telefon numarası alanıdır. */
	deliveryAccountMobile1?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** Klasör Adı alanıdır. */
	folderName?: string | null;
	/** Sipariş no alanıdır. */
	orderNo?: string | null;
	/** Sipariş tarihi alanıdır. */
	orderDate?: string | null;
	/** Alıcı Şube adı alanıdır. */
	deliveryAccountBranchName?: string | null;
	/** Firma şube adı alanıdır. */
	tenantBranchName?: string | null;
	/** İrsaliye Detay modelidir */
	despatchDetail: DespatchDetailResultModel[];
}

export interface DespatchResultModelListResultModel {
	data?: DespatchResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Kontör Yükleme Bilgilerini tutar
 */
export interface DocumentCreditModel {
	/** Kontör yüklemesi yapılacak ilgili mükellefin VKN/TCKN'si */
	identifierNumber: string;
	/** Tarife Kodu */
	tariffCode: string;
	/** Yükleme Tarihi */
	docDate: string;
	/** Yükleme Adedi */
	creditQty: number;
	/** Bitiş Tarihi (En fazla 36 ay) (Eğer boş bırakılırsa tarife üzerinde yer alan geçerli ay üzerinden hesaplanacaktır.) */
	expiryDate?: string | null;
	/** Not */
	note?: string | null;
}

/**
 * Kontör sorgulama modeli
 */
export interface DocumentCreditQueryModel {
	/** Kontör Yükleme Tarihi */
	docDate?: string;
	/** Kontör yüklemenin süreli yada süresiz olduğunu belirtir. */
	isNotExpiry?: boolean;
	/** Geçerlilik tarihi */
	expiryDate?: string;
	/** Yüklenen kontör miktarı */
	creditQty?: number;
	/** Kullanılan kontör miktarı */
	usedCreditQty?: number;
	/** Kullanım süresi geçmiş kontör miktarı */
	expiredCreditQty?: number;
	/** Yüklenen kontörün geçerli olduğu ürünlerin bilgisi */
	activationProductTypeDescription?: string | null;
	/** Tarife adı */
	tariffName?: string | null;
}

/**
 * Kontör Kaydetme Sınıfı
 */
export interface DocumentCreditResultModel {
	/** Kaydedilen kontör id */
	id?: number;
}

export interface DocumentCreditResultModelResultModel {
	data?: DocumentCreditResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Numaratör tanımı
 */
export interface DocumentNumberApiViewModel {
	/** Ön Ek */
	prefix?: string | null;
	/** Belge Tipi */
	edocumentType?: string | null;
	/** Belge tipi açıklaması */
	edocumentTypeDescription?: string | null;
	/** Varsayılan bilgisi */
	isDefault?: boolean;
	/** İnternet satış için mi kullanılacak? */
	isInternetSales?: boolean;
	/** Pasif bilgisi */
	isPassive?: boolean;
	/** Bu numaratörün dahil olduğu numaratör setleri */
	numeratorSets?: NumeratorSetItemViewModel[] | null;
}

export interface DocumentNumberApiViewModelListResultModel {
	data?: DocumentNumberApiViewModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Belge numarası tanımı
 */
export interface DocumentNumberRequestModel {
	/** İşlem yapılmak istenen firmanın VKN/TCKNsi */
	identifierNumber?: string | null;
	/** Ön ek */
	prefix?: string | null;
	/** Numaratörün kullanılacağı belge tipi. 1- E-Fatura, 2 - E-Arşiv Fatura, 3 - E-İrsaliye,
 4 - E-İrsaliye Yanıtı, 5 - E-SMM, 6 - E-MM,7 - E-Döviz Satım, 8 - E-Döviz Alım, 9 E-Adisyon, 10 - GİB E-Arşiv Fatura,
 11 e-Dekont */
	eDocumentType?: number;
	/** İnternet satış için mi kullanılacak? */
	isInternetSales?: boolean;
	/** Varsayılan numaratör */
	isDefault?: boolean;
	/** Numaratörü pasife almak için kullanılır */
	isPassive?: boolean;
	/** Son alınan numara. Bu alan, eğer numaratörün sıfırdan başlaması istenmiyorsa kullanılmalı. */
	lastNumber?: number;
}

/**
 * Gelen E-Arşiv modeli
 */
export interface EArchiveDocumentInboxApiModel {
	/** Id */
	id?: number;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Oluşturulma Tarihi */
	createDate?: string | null;
	/** Fatura Numarası */
	docNo?: string | null;
	/** Fatura Tarihi */
	docDate?: string;
	/** Vergiler Hariç Tutar */
	taxExclusiveAmtTra?: number;
	/** Vergiler Dahil Tutar */
	taxInclusiveAmtTra?: number;
	/** Ödenecek Tutar */
	payableAmtTra?: number;
	/** Hesap Adı */
	accountName?: string | null;
	/** Hesap VKN/TCKN */
	accountVknTckn?: string | null;
	/** Para Birimi */
	currencyCode?: string | null;
	/** Kur */
	currencyRate?: number;
	/** Hesap Mobil No */
	accountMobilePhone?: string | null;
	/** Hesap E-Mail */
	accountEmail?: string | null;
	/** Fatura Toplamı */
	lineExtensionAmount?: number;
	/** Ödenecek Tutar Yuvarlama */
	payableRoundingAmount?: number;
	/** İndirim Tutarı */
	allowanceTotalAmount?: number;
	/** Artırım Tutarı */
	chargeTotalAmount?: number;
	/** Tevkifat Tutarı */
	withholdingTaxAmount?: number;
	/** Sıfır KDV Tutarı */
	taxAmtTraRate0?: number;
	/** 1 KDV Tutarı */
	taxAmtTraRate1?: number;
	/** 8 KDV Tutarı */
	taxAmtTraRate8?: number;
	/** 18 KDV tutarı */
	taxAmtTraRate18?: number;
	/** 10 KDV tutarı */
	taxAmtTraRate10?: number;
	/** 20 KDV tutarı */
	taxAmtTraRate20?: number;
	/** Toplam Vergi Tutarı */
	taxTotalTra?: number;
}

export interface EArchiveDocumentInboxApiModelListResultModel {
	data?: EArchiveDocumentInboxApiModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * 5000/30000 belgelerinin tutulduğu sınıf
 */
export interface EArchiveInboxModel {
	/** Id */
	id?: number;
	/** Belge numarası */
	docNo?: string | null;
	/** Belge Tarihi */
	docDate?: string;
	/** Belge Zamanı */
	docTime?: string;
	/** Müşteri Adı/Unvanı */
	accountName?: string | null;
	/** Müşteri VKN/TCKN */
	accountVknTckn?: string | null;
	/** Gönderim tipi adı */
	sendTypeName?: string | null;
	/** Yükleme numarası */
	installationNumber?: string | null;
	/** Para Birimi */
	currencyCode?: string | null;
	/** Toplam tutar */
	totalAmtTra?: number;
	/** Ödenecek toplam tutar */
	payableAmtTra?: number;
	/** Toplam vergi tutarı */
	taxTotal?: number;
}

export interface EArchiveInboxModelListResultModel {
	data?: EArchiveInboxModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface EArchiveProcessStatusModel {
	belgeNumarasi?: string | null;
	aliciVknTckn?: string | null;
	aliciUnvanAdSoyad?: string | null;
	saticiVknTckn?: string | null;
	saticiUnvanAdSoyad?: string | null;
	belgeTarihi?: string | null;
	belgeTuru?: string | null;
	onayDurumu?: string | null;
	ettn?: string | null;
	talepDurumColumn?: string | null;
	talepDurum?: number;
	iptalItiraz?: number;
	portalInvoiceStatus?: number | null;
	errorAvail?: boolean;
	errorMessage?: string | null;
	invoiceId?: number;
	email?: string | null;
}

export interface EArchiveSmsConfirmModel {
	invoiceList?: EArchiveProcessStatusModel[] | null;
	confirmCode?: string | null;
	token?: string | null;
	confirmId?: string | null;
	phoneNo?: string | null;
	smsConfirmDuration?: number;
}

export interface EArchiveSmsConfirmModelQueryResultModel {
	data?: EArchiveSmsConfirmModel;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * E-Mail durum açıklaması
 */
export interface EMailEventModel {
	/** Alıcı adresi */
	recipient?: string | null;
	/** Durum tipi */
	eventType?: string | null;
	/** İletilmeme tipi */
	bounceType?: string | null;
	/** İletim zamanı */
	receivedAt?: string | null;
	/** Durum oluşma zamanı */
	eventCreateDate?: string | null;
}

export interface EMailEventModelListResultModel {
	data?: EMailEventModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İlgili mailin durumuyla ilgili bilgi veren sınıf
 */
export interface EMailTransactionStatusModel {
	/** Gönderilen mail kutusu bilgisi */
	mailTo?: string | null;
	/** Eğer var ise mailin iletiminde alınan hata bilgisi */
	errorDescription?: string | null;
	/** İlgili mailin gönderim tarihi */
	emailDate?: string;
	/** Mailin son durumu ('Alıcıya Teslim Edildi' - Mail ilgili mail kutusuna başarıyla gönderilmiş. 'Mail Açıldı' - İlgili mail okunmuş.
 'Tıklandı' - İlgili mailin içindeki fatura görüntüleme linkine tıklanmış.
 'Gönderime Hazır' - Mail henüz mail kuyruğuna gönderilmemiş.
 'Kuyruğa Gönderildi' - Mail, mail gönderim kuyruğuna eklendi.
 'Kuyrukta' - Mail kuyrukta işleniyor.
 'Mail Servisine Gönderildi' - İlgili mail, mail gönderim servisine iletildi. 
 'Hata' - Mail iletilemedi. */
	emailStatus?: string | null;
}

export interface EMailTransactionStatusModelListResultModel {
	data?: EMailTransactionStatusModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * ESURapor Bilgisi
 */
export interface ESUReportInfo {
	/** ESU Rapor Id bilgisidir. GUID formatında (8-4-4-4-12) olmalıdır. Örn: 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
	eSUReportId?: string | null;
	/** ESU Rapor Tarihi bilgisidir. yyyy-MM-dd formatında geçerli bir tarih olmalıdır. Örn: 2026-09-14 */
	eSUReportDate?: string;
}

/**
 * Toplu izin gönderim durumu sorgulama sınıfı
 */
export interface ETKCheckBatchConsentStatusRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** Gönderilen izin kaydının durumunu sorgulamak için kullanılacak referans değeridir. (Bu alanın istek içerisinde yer alması serviceReferanceKey boş olduğu zaman zorunludur.) */
	referanceKey?: string | null;
	/** İzni gönderen uygulama tarafındaki izne ait tekil referans değerini ifade eder. serviceReferanceKey üzerinden izin durum sorgulaması yapılabilir. (Bu alanın istek içerisinde yer alması referanceKey boş olduğu zaman zorunludur.) */
	serviceReferanceKey?: string | null;
}

/**
 * Toplu izin gönderim durum sorgu sonuç sınıfı
 */
export interface ETKCheckBatchConsentStatusResultModel {
	batchResult?: ETKConsentUploadStatusApiModel;
}

export interface ETKCheckBatchConsentStatusResultModelResultModel {
	data?: ETKCheckBatchConsentStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gönderilen ETK izninin durumunu sorgulamaya yarayan sınıf
 */
export interface ETKCheckConsentStatusRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** Gönderilen izin kaydının durumunu sorgulamak için kullanılacak referans değeridir. (Bu alanın istek içerisinde yer alması serviceReferanceKey boş olduğu zaman zorunludur.) */
	referanceKey?: string | null;
	/** İzni gönderen uygulama tarafındaki izne ait tekil referans değerini ifade eder. serviceReferanceKey üzerinden izin durum sorgulaması yapılabilir. (Bu alanın istek içerisinde yer alması referanceKey boş olduğu zaman zorunludur.) */
	serviceReferanceKey?: string | null;
}

/**
 * Alıcı durum sorgu sınıfı
 */
export interface ETKCheckRecipientStatusRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient: string;
}

/**
 * Durumu değişen izin verilerini dönen metod isteği
 */
export interface ETKCheckStatusChangedConsentDataRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** Başlangıç tarihi. Tarih, "yyyy-MM-dd" formatında olmalıdır. 
 Başlangıç tarihi ile bitiş tarihi arasındaki fark en fazla 7 gün olabilir. */
	startDate: string;
	/** Bitiş Tarihi. Tarih, "yyyy-MM-dd" formatında olmalıdır. 
 Başlangıç tarihi ile bitiş tarihi arasındaki fark en fazla 7 gün olabilir. */
	endDate: string;
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
}

/**
 * TenantBrand sorgu sonucu modeli
 */
export interface ETKCheckTenantBrandQueryDataModel {
	/** IYS Marka Kodu */
	iysBrandCode?: string | null;
	/** Marka Adı */
	brandName?: string | null;
}

export interface ETKCheckTenantBrandQueryDataModelListResultModel {
	data?: ETKCheckTenantBrandQueryDataModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gönderilen TenantIdentifierNumber ile TenantBrand sorgulamaya yarayan sınıf
 */
export interface ETKCheckTenantBrandsByTenantIdentifierRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
}

/**
 * ETK İzin Modeli
 */
export interface ETKConsentApiModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_KARAR</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır.Alıcı tipi TACIR ise eklenmesi zorunlu değildir.(TACIR tipli izinlerin güncellemesinde source alanı istek içerisinde yer almalıdır.) */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarihtir. Alıcı tipi TACIR ise eklenmesi zorunlu değildir. İzinlerin tarih formatı YYYY-MM-DD HH:mm:ss, saat dilimi Türkiye saati kabul edilir.(TACIR tipli izinlerin güncellemesinde consentDate alanı istek içerisinde yer almalıdır.) */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder.Aynı iletişim adresi için bir bireysel, bir tacir izin kaydı oluşturulabilir.Örneğin, perakende sektöründeki bir hizmet sağlayıcıyla ticari bağı bulunan bir muhasebeci aynı zamanda bu hizmet sağlayıcının bireysel müşterisi de olabilir.Dolayısıyla aynı iletişim adresi hem tacir hem de bireysel alıcı olarak İYS'ye kaydedilebilir. (Varsayılan değer: BIREYSEL) */
	recipientType: string;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama tutulmak istenir ise bu alan kullanılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	note?: string | null;
	/** İzni gönderen uygulama tarafındaki izne ait tekil referans değerini ifade eder. serviceReferanceKey üzerinden izin durum sorgulaması yapılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	serviceReferanceKey?: string | null;
}

/**
 * Toplu izin gönderiminde hata alan izinleri tutan sınıf
 */
export interface ETKConsentForBatchApiModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient: string;
	/** Hata kodu */
	errorCode?: string | null;
	/** Hata açıklaması */
	errorDescription?: string | null;
}

/**
 * ETK İzin durum sorgu sınıfı
 */
export interface ETKConsentQueryDataModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_KARAR</code></li><li><code style="color: black;">IYS_CM</code></li><li><code style="color: black;">IYS_WEB</code></li><li><code style="color: black;">IYS_MOBIL</code></li><li><code style="color: black;">IYS_KISAMESAJ</code></li><li><code style="color: black;">IYS_EPOSTA</code></li><li><code style="color: black;">IYS_AHS_HAT_KAPATMA</code></li><li><code style="color: black;">IYS_WEB_YENI</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır. */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarihtir. */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder. */
	recipientType: string;
	/** İlgili toplu izin gönderiminin, sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">TASLAK</code></li><li><code style="color: black;">ISLENMEYI_BEKLIYOR</code></li><li><code style="color: black;">ISLENIYOR</code></li><li><code style="color: green;">IYSDE_KAYITLI</code></li><li><code style="color: black;">HATA</code></li></ul> */
	portalStatus: string;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama alanıdır. */
	note?: string | null;
	/** İzne ilişkin son güncelleme zamanıdır. */
	lastUpdateDate: string;
}

export interface ETKConsentQueryDataModelListResultModel {
	data?: ETKConsentQueryDataModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * ETK İzin Hareketi durum sorgu sınıfı
 */
export interface ETKConsentTransactionDataModel {
	/** Kaydın MYSOFT tarafındaki Id değeridir. */
	id: number;
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_KARAR</code></li><li><code style="color: black;">IYS_CM</code></li><li><code style="color: black;">IYS_WEB</code></li><li><code style="color: black;">IYS_MOBIL</code></li><li><code style="color: black;">IYS_KISAMESAJ</code></li><li><code style="color: black;">IYS_EPOSTA</code></li><li><code style="color: black;">IYS_AHS_HAT_KAPATMA</code></li><li><code style="color: black;">IYS_WEB_YENI</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır. */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarih ve saatidir. */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder. */
	recipientType: string;
	/** İlgili toplu izin gönderiminin, sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">TASLAK</code></li><li><code style="color: black;">IYSYE_GONDERIM_ICIN_BEKLIYOR</code></li><li><code style="color: black;">IYSYE_GONDERILIYOR</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANACAK</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILIYOR</code></li><li><code style="color: green;">IYSDE_KAYITLI</code></li><li><code style="color: black;">HATA</code></li></ul> */
	portalStatus: string;
	/** İzin kaydının İYS'deki Request id bilgisidir. */
	requestId?: string | null;
	/** İzin kaydının İYS'deki eklenen sıralı numara bilgisidir. Sadece izin takibi için kullanılır. */
	subRequestId?: string | null;
	/** İzin kaydının İYS'ye kayıt tarih ve saatidir. */
	creationDate?: string | null;
	/** İzin kaydının İYS'deki işlem anahtar(transaction id) bilgisidir. */
	transactionId?: string | null;
	/** İzin hareketinin hangi uygulama üzerinden oluşturuluğu bilgisidir. Enum:
 
 <ul><li><code style="color: black;">MYSOFT_PORTAL</code></li><li><code style="color: black;">MYSOFT_EXCEL</code></li><li><code style="color: black;">MYSOFT_API</code></li><li><code style="color: black;">IYS_WEBHOOK</code></li><li><code style="color: black;">MUTABAKAT</code></li><li><code style="color: black;">PULL_SERVIS</code></li><li><code style="color: black;">IYS_DURUM_SORGU</code></li><li><code style="color: black;">MUTABAKAT_ESITLEME</code></li></ul> */
	recordSource?: string | null;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama alanıdır. */
	note?: string | null;
	/** Hata kodu */
	errorCode?: string | null;
	/** Hata açıklaması */
	errorDescription?: string | null;
}

export interface ETKConsentTransactionDataModelListResultModel {
	data?: ETKConsentTransactionDataModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İzin hareketi verilerini dönen metod isteği  Başlangıç ve Bitiş tarihi boş bırakılırsa 7 günlük izin hareketleri getirilir. Limit bilgisi boş bırakılırsa en fazla 1000 kayıt listelenir.
 */
export interface ETKConsentTransactionDataRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** Başlangıç tarihi. Tarih, "yyyy-MM-dd" formatında olmalıdır. 
 Başlangıç tarihi ile bitiş tarihi arasındaki fark en fazla 7 gün olabilir. */
	startDate?: string | null;
	/** Bitiş Tarihi. Tarih, "yyyy-MM-dd" formatında olmalıdır. 
 Başlangıç tarihi ile bitiş tarihi arasındaki fark en fazla 7 gün olabilir. */
	endDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS</code></li><li><code style="color: black;">IYS</code></li></ul>
 Belirtilen kaynağa göre (HS veya IYS) kayıtları filtrelemek için kullanılır. 
 Eğer bu alan boş bırakılırsa, hem HS_* hem de IYS_* kaynaklı bütün kayıtlar getirilir. */
	source?: string | null;
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. Varsayılan değeri 0'dır. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. Varsayılan değeri 1000'dir. */
	limit?: number;
}

/**
 * ETK İzin Hareketi durum sorgu sınıfı
 */
export interface ETKConsentTransactionQueryDataModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_KARAR</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır. */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarihtir. */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder. */
	recipientType: string;
	/** İlgili toplu izin gönderiminin, sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">IYSYE_GONDERIM_ICIN_BEKLIYOR</code></li><li><code style="color: black;">IYSYE_GONDERILIYOR</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANACAK</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILIYOR</code></li><li><code style="color: green;">IYSDE_KAYITLI</code></li><li><code style="color: black;">HATA</code></li></ul> */
	portalStatus: string;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama alanıdır. */
	note?: string | null;
}

export interface ETKConsentTransactionQueryDataModelResultModel {
	data?: ETKConsentTransactionQueryDataModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Toplu izin gönderiminde gönderilen izin sınıfı
 */
export interface ETKConsentUploadDetailStatusApiModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. */
	recipient?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_KARAR</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır. */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status?: string | null;
	/** İznin alındığı tarihtir. */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder. */
	recipientType?: string | null;
	/** İlgili toplu izin gönderimindeki kayıtların sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">TASLAK</code></li><li><code style="color: black;">IYSYE_GONDERIM_ICIN_BEKLIYOR</code></li><li><code style="color: black;">IYSYE_GONDERILIYOR</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANACAK</code></li><li><code style="color: black;">PAKET_DURUM_SORGULANIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">MYSOFTDAN_IYSYE_SENKRONIZE_EDILIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILMEYI_BEKLIYOR</code></li><li><code style="color: black;">IYSDEN_MYSOFTA_SENKRONIZE_EDILIYOR</code></li><li><code style="color: green;">IYSDE_KAYITLI</code></li><li><code style="color: black;">HATA</code></li></ul> */
	portalStatus: string;
	/** İzin kaydının İYS'deki Request id bilgisidir. */
	requestId?: string | null;
	/** İzin kaydının İYS'deki eklenen sıralı numara bilgisidir. Sadece izin takibi için kullanılır. */
	subRequestId?: string | null;
	/** İzin kaydının İYS'ye kayıt tarih ve saatidir. */
	creationDate?: string | null;
	/** İzin kaydının İYS'deki işlem anahtar(transaction id) bilgisidir. */
	transactionId?: string | null;
	/** Hata kodu */
	errorCode?: string | null;
	/** Hata açıklaması */
	errorDescription?: string | null;
}

/**
 * Toplu izin gönderim durum sorgu sınıfı
 */
export interface ETKConsentUploadStatusApiModel {
	/** Gönderilen toplu izin kaydının durumunu sorgulamak için kullanılacak referans değeridir. */
	referanceKey?: string | null;
	/** İzni gönderen uygulama tarafındaki izne ait tekil referans değerini ifade eder. serviceReferanceKey üzerinden izin durum sorgulaması yapılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	serviceReferanceKey?: string | null;
	/** Açıklama */
	note?: string | null;
	/** İşleme başlangıç zamanı */
	processStartDate?: string | null;
	/** İşleme bitiş zamanı */
	processEndDate?: string | null;
	/** İlgili toplu izin gönderiminin, sistemdeki işlenme durumunu gösteren alan. Enum:
 
 <ul><li><code style="color: black;">IZINLER_ISLENMEYI_BEKLIYOR</code></li><li><code style="color: black;">IZINLER_ISLENIYOR</code></li><li><code style="color: black;">ISLENDI</code></li><li><code style="color: black;">IZINLER_ISLENIRKEN_HATA_OLUSTU</code></li></ul> */
	portalStatus: string;
	/** Toplu izin gönderiminde gönderilen izin listesi */
	detailList?: ETKConsentUploadDetailStatusApiModel[] | null;
}

/**
 * ETK İzin Modeli
 */
export interface ETKSendConsentBatchDetailRequestModel {
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">ARAMA</code></li><li><code style="color: black;">MESAJ</code></li><li><code style="color: black;">EPOSTA</code></li></ul>
 Alıcının izin verdiği iletişim kanalıdır. */
	type: string;
	/** Enum: 
 
 <ul><li><code style="color: black;">HS_FIZIKSEL_ORTAM</code></li><li><code style="color: black;">HS_ISLAK_IMZA</code></li><li><code style="color: black;">HS_WEB</code></li><li><code style="color: black;">HS_CAGRI_MERKEZI</code></li><li><code style="color: black;">HS_SOSYAL_MEDYA</code></li><li><code style="color: black;">HS_EPOSTA</code></li><li><code style="color: black;">HS_MESAJ</code></li><li><code style="color: black;">HS_MOBIL</code></li><li><code style="color: black;">HS_EORTAM</code></li><li><code style="color: black;">HS_ETKINLIK</code></li><li><code style="color: black;">HS_2015</code></li><li><code style="color: black;">HS_ATM</code></li><li><code style="color: black;">HS_KARAR</code></li></ul>
 Alıcının izin durumu belirlediği kaynaktır.Alıcı tipi TACIR ise eklenmesi zorunlu değildir.(TACIR tipli izinlerin güncellemesinde source alanı istek içerisinde yer almalıdır.) */
	source?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">ONAY</code></li><li><code style="color: black;">RET</code></li></ul>
 Alıcının izin durumunu gösterir. */
	status: string;
	/** İznin alındığı tarihtir. Alıcı tipi TACIR ise eklenmesi zorunlu değildir. İzinlerin tarih formatı YYYY-MM-DD HH:mm:ss, saat dilimi Türkiye saati kabul edilir.(TACIR tipli izinlerin güncellemesinde consentDate alanı istek içerisinde yer almalıdır.) */
	consentDate?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">BIREYSEL</code></li><li><code style="color: black;">TACIR</code></li></ul>
 İzin kaydının tacir veya bireysel amaçla alındığını ifade eder.Aynı iletişim adresi için bir bireysel, bir tacir izin kaydı oluşturulabilir.Örneğin, perakende sektöründeki bir hizmet sağlayıcıyla ticari bağı bulunan bir muhasebeci aynı zamanda bu hizmet sağlayıcının bireysel müşterisi de olabilir.Dolayısıyla aynı iletişim adresi hem tacir hem de bireysel alıcı olarak İYS'ye kaydedilebilir. (Varsayılan değer: BIREYSEL) */
	recipientType: string;
	/** İzne ilişkin özel açıklama tutulmak istenir ise bu alan kullanılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	note?: string | null;
}

/**
 * Çoklu izin gönderim modeli
 */
export interface ETKSendConsentBatchRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	/** IYS İzin Veri Listesi */
	consentDataList: ETKSendConsentBatchDetailRequestModel[];
	/** İzni gönderen uygulama tarafındaki izne ait tekil referans değerini ifade eder. serviceReferanceKey üzerinden izin durum sorgulaması yapılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	serviceReferanceKey?: string | null;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	folderName?: string | null;
	/** İzne ilişkin özel açıklama tutulmak istenir ise bu alan kullanılabilir. (Bu alanın istek içerisinde yer alması zorunlu değildir.) */
	note?: string | null;
}

/**
 * Çoklu izin gönderim sonuç sınıfı
 */
export interface ETKSendConsentBatchResultModel {
	/** Gönderilen toplu izin kaydının durumunu sorgulamak için kullanılacak referans değeridir. */
	referanceKey?: string | null;
	/** Toplu gönderimde hata alan izin kaydı listesi */
	errorConsentList?: ETKConsentForBatchApiModel[] | null;
}

export interface ETKSendConsentBatchResultModelResultModel {
	data?: ETKSendConsentBatchResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Tekli izin gönderim modeli
 */
export interface ETKSendConsentModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Marka kodu */
	brandCode: number;
	consentData: ETKConsentApiModel;
}

/**
 * Tekli izin gönderim sonuç sınıfı
 */
export interface ETKSendConsentResultModel {
	/** Gönderilen izin kaydının durumunu sorgulamak için kullanılacak referans değeridir. */
	referanceKey?: string | null;
}

export interface ETKSendConsentResultModelResultModel {
	data?: ETKSendConsentResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface EkSaha {
	anahtar?: string | null;
	deger?: string | null;
}

/**
 * UBL XML formatında gider pusulası gönderimi için model
 */
export interface ExpenseVoucherForUblXmlModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** UBL XML formatında sıkıştırılmış gider pusulası belgesi (Base64 zip) */
	creditNoteTypeUblString?: string | null;
	/** Numaratör seti kodu */
	numeratorSetCode?: string | null;
	/** Ön ek */
	prefix?: string | null;
	/** XSLT adı */
	xsltName?: string | null;
	/** XSLT set kodu */
	xsltSetCode?: string | null;
	/** Varsayılan XSLT yoksa genel XSLT ile gönder */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Şema ve şematron kontrolünü devre dışı bırak */
	isNotControlSchemaSchematron?: boolean | null;
	/** Connector GUID */
	connectorGuid?: string | null;
}

/**
 * Gider pusulası başlık bilgi modeli
 */
export interface ExpenseVoucherInfoModel {
	/** Kayıt Id */
	id?: number;
	/** Gider pusulası ETTN */
	expenseVoucherETTN?: string | null;
	/** Portal gider pusulası durum metni */
	portalExpenseVoucherStatusText?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** Belge tarihi */
	docDate?: string;
	/** Hesap adı */
	accountName?: string | null;
	/** Hesap adı (gerçek kişi - ad) */
	accountFirstName?: string | null;
	/** Hesap adı (gerçek kişi - soyad) */
	accountFamilyName?: string | null;
	/** Hesap VKN/TCKN */
	accountVknTckn?: string | null;
	/** Para birimi kodu */
	currencyCode?: string | null;
	/** Döviz kuru */
	currencyRate?: number;
	/** Vergi hariç tutar (TL) */
	taxExclusiveAmtTra?: number;
	/** Vergi dahil tutar (TL) */
	taxInclusiveAmtTra?: number;
	/** Ödenecek tutar (TL) */
	payableAmtTra?: number;
	/** Toplam vergi tutarı (TL) */
	taxTotalTra?: number;
}

export interface ExpenseVoucherInfoModelListResultModel {
	data?: ExpenseVoucherInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * E-Gider Pusulası belgesi alıcı hesap bilgileri
 */
export interface ExpenseVoucherOutboxCustomerAccountModel {
	/** Alıcı VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Alıcı unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Alıcı Adı */
	firstName?: string | null;
	/** Alıcı Soyadı */
	familyName?: string | null;
	/** Alıcı Uyruğu */
	nationality?: string | null;
	/** Alıcı vergi dairesi adı bilgisidir. */
	taxOfficeName?: string | null;
	/** Müşteri-Tedarikçi Ülke Adı alanıdır */
	countryName?: string | null;
	/** Müşteri-Tedarikçi Şehir Adı alanıdır */
	cityName?: string | null;
	/** İç kapı numarası bilgisidir. */
	room?: string | null;
	/** Meydan/bulvar/cadde adı bilgisidir. */
	streetName?: string | null;
	/** Blok Adı alanıdır */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina veya bloğa ait dış kapı numarası bilgisidir. */
	buildingNumber?: string | null;
	/** Semt alanıdır */
	citySubdivision?: string | null;
	/** Posta Kodu alanıdır */
	postalCode?: string | null;
	/** Kasaba/köy/mezra/mevkii bilgisidir. */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email1?: string | null;
	/** Alıcının web sayfası adresi bilgisidir. */
	webSiteUrl?: string | null;
}

/**
 * Gider pusulası detay modeli
 */
export interface ExpenseVoucherOutboxDetailModel {
	/** Satıcı mal veya hizmet kodu bilgisidir. */
	productCode?: string | null;
	/** Stok Adı alanıdır */
	productName?: string | null;
	/** Alıcı mal veya hizmet kodu bilgisidir. */
	buyerProductCode?: string | null;
	/** Üretici mal veya hizmet kodu bilgisidir. */
	manufacturerProductCode?: string | null;
	/** Marka Adı alanıdır */
	brandName?: string | null;
	/** Model Adı alanıdır */
	modelName?: string | null;
	/** Birim kodu bilgisidir. ISO birim kodu yazılmalıdır. Adet için örn: 'C62' gönderilmesi gerekmektedir. */
	unitCode?: string | null;
	/** Para birimi kodu. Detayda farklı para birimleri kullanılacaksa bu alan doldurulabilir. Ancak bu şekildeki kullanımda, masterdaki tax alanı dolu gönderilmelidir. */
	currencyCode?: string | null;
	/** Miktar alanıdır */
	qty?: number;
	/** Birim Fiyat alanıdır */
	unitPriceTra?: number;
	/** Tutar alanıdır */
	amtTra?: number;
	/** KDV Oran alanıdır */
	vatRate?: number;
	/** KDV Tutar alanıdır */
	amtVatTra?: number;
	/** KDV hesaplanacak matrah bilgisidir. Herhangi bir değer gönderilmez ise, amtTra alanı taxableAmtTra olarak alınacaktır. */
	taxableAmtTra?: number;
	/** Fatura kalemi için girmek istediğiniz not bilgisidir. Tek satır açıklama girilecek ise bu alan kullanılabilir. */
	note?: string | null;
	/** Fatura kalemi için girmek istediğiniz notlardır. Birden fazla açıklama girilecek ise bu alan kullanılabilir. */
	noteList?: string[] | null;
	medicineMedicalEquipmentInfo?: MedicineMedicalEquipmentInfo;
	/** GTİP numarası bilgisidir.Standart kod değerleri girilmelidir. */
	gtip?: string | null;
	/** “İhraç Kayıtlı” fatura tipinde, 702 kodlu istisna seçildiğinde girilmesi zorunlu olan Alıcı satır kodudur. */
	lineCode?: string | null;
	/** “İhraç Kayıtlı” fatura tipinde, 702 kodlu istisna seçildiğinde girilmesi zorunlu olan Satıcı satır kodudur. */
	sellerlineCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana kodlu olarak girilecektir.
 invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana serbest metin olarak girilecektir.
 invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonName?: string | null;
	/** Tevkifat kodu bilgisidir. */
	withholdingTaxTypeCode?: string | null;
	/** Tevkifat adı bilgisidir. */
	withholdingTaxTypeName?: string | null;
	/** Tevkifat oranı bilgisidir.
 (sadece withholdingTaxTypeCode = 650 olduğu durumlarda değer doldurulabilir. */
	withholdingTaxPercentage?: number;
	/** Tevkifatın hesaplandığı tutar (matrah) bilgisidir. */
	withholdingTaxableAmount?: number;
	/** Tevkifat tutar bilgisidir. */
	withholdingTaxAmount?: number;
	/** HKS Künye no */
	hksTagNumber?: string | null;
	/** HKS Mal Sahibi Adı */
	hksOwnerFullName?: string | null;
	/** HKS Mal Sahibi VKN TCKN */
	hksOwnerIdentifier?: string | null;
	/** Detaydaki mal hizmet tutarı yazılırken, satırda yapılan toplam iskonto değeri amtTra alanından çıkartılıp mı yazılacak, çıkartmadan mı yazılacak onu belirlemek için kullanılır. */
	isSubtractDiscountFromAmtTra?: boolean | null;
	/** Ek vergiler bilgileri alanıdır. */
	tax?: InvoiceOutboxDetailTaxModel[] | null;
	/** İskonto/Artırım bilgileri. */
	allowanceCharge?: AllowanceCharge[] | null;
	/** Stok için ek bilgiler */
	additionalItemIdentification?: IdentificationType[] | null;
	/** Stok özellikleri */
	itemInstance?: ItemInstance[] | null;
	/** Harcama Tipi (YATIRIMTESVIK faturaları için)
 01 - Makine ve teçhizat teslimleri ile yazılım ve gayrimaddi hak satış ve kiralamalarına ilişkin faturalar
 02 - İnşaat işlerine ilişkin mal teslimleri ve hizmet ifalarına ait faturalar
 03 - Arsa ve Arazi Satışına ait faturalar
 04 - Diğer harcamalara ilişkin faturalar */
	expenditureType?: string | null;
	shipment?: Shipment;
	technologyAssistanceDeviceInfo?: TechnologyAssistanceDeviceInfo;
}

/**
 * E-Gider Pusulası oluşturma isteği modeli
 */
export interface ExpenseVoucherOutboxModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge tarihi */
	docDate?: string;
	/** Belge tarihi */
	docTime?: string;
	/** Belge numarası. Boş bırakılırsa otomatik atanır. (Örnek format: ABC2021000000001) */
	docNo?: string | null;
	/** Belge ETTN. Boş bırakılırsa otomatik oluşturulur. */
	ettn?: string | null;
	/** Gider pusulası tipidir. "SATIS", yada "IADE" olabilir. */
	invoiceType?: string | null;
	/** Para birimi kodu. ISO para birimi kodu yazılmalıdır. Örneğin: 'TRY', 'USD' gibi. */
	currencyCode?: string | null;
	/** Döviz kuru bilgisidir.'TRY' olması durumunda 1 değeri girilmelidir. */
	currencyRate?: number;
	/** Fatura not bilgisidir.Liste içerisinde birden fazla not eklemesi yapılabilir. */
	notes?: NoteModel[] | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** E-Gider Pusulası için kullanılan gönderim tipi bilgisidir. string(enum) ("ELEKTRONIK", "KAGIT") */
	senderType?: string | null;
	accountCustomer?: ExpenseVoucherOutboxCustomerAccountModel;
	/** İade gider pusulası numarası */
	billingRefInvoiceNo?: string | null;
	/** İade gider pusulası tarihi */
	billingRefInvoiceDate?: string | null;
	/** İade fiş numarası */
	okcSerialNo?: string | null;
	/** İade fiş tarihi */
	okcReceiptDate?: string | null;
	/** İade kodunun gönderildiği uygulama yada platform adı, yada SMS gönderiminde hizmet alınan operatörün adı */
	platformAccountName?: string | null;
	/** İade kodunun gönderildiği uygulamanın, yada SMS gönderiminde hizmet alınan operatörün VKN'si */
	platformAccountIdentifierNumber?: string | null;
	/** Göndeirlen kodun tipi. Geçerli değerler "IADEKODU", "SMS" */
	confirmationCodeType?: string | null;
	/** Kodun gönderildiği telefon numarası. */
	confirmationPhone?: string | null;
	/** Gönderilen IADE yada SMS kodu */
	confirmationCode?: string | null;
	/** İade edilecek ürüne ait faturada alıcı olarak yer alan kişi haricinde başka biri tarafından iade işlemi talep ediliyorsa bu alan doldurulmalıdır. */
	returnSenderName?: string | null;
	/** İade işlemini yapan kişinin türü.Geçerli değerler "GERCEK", "TUZEL" */
	returnSenderType?: string | null;
	/** İade işlemini yapan kişinin VKN'si veya TCKN'si. returnSenderType alanına göre gönderilmesi gereken değer değişmektedir. returnSenderType = "GERCEK" ise TCKN, returnSenderType = "TUZEL" ise VKN gönderilmelidir. */
	returnSenderIdentifierNumber?: string | null;
	/** Ürün iade işlemi kargo üzerinden gerçekleşirse, bu alana kargo şirketinin adı yazılacaktır. */
	cargoAccountName?: string | null;
	/** Kargo firmasının türü, Geçerli değerler "GERCEK", "TUZEL" */
	cargoAccountType?: string | null;
	/** Kargo firması VKN yada TCKN */
	cargoAccountIdentifierNumber?: string | null;
	/** Kargo yetki belge numarası */
	cargoAuthorizationCertificateNo?: string | null;
	/** Numaratör seti kodu */
	numeratorSetCode?: string | null;
	/** Gider pusulasına eklenmek istenen ek bilgiler bu kısımda yazılmalıdır. */
	additionalDocumentRef?: AdditionalDocumentRef[] | null;
	/** Ön ek */
	prefix?: string | null;
	/** XSLT adı */
	xsltName?: string | null;
	/** XSLT set kodu */
	xsltSetCode?: string | null;
	/** Varsayılan XSLT yoksa genel XSLT ile gönder */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Şema ve şematron kontrolünü devre dışı bırak */
	isNotControlSchemaSchematron?: boolean | null;
	/** Connector GUID */
	connectorGuid?: string | null;
	legalMonetaryTotal?: InvoiceCalculationModel;
	/** Fatura üzerindeki vergi bilgileridir. Eğer boş gönderilirse, fatura üzerindeki vergi bilgisi detaylar üzerinden doldurulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	tax?: TaxTotal[] | null;
	/** Vergi muafiyeti bilgisidir. Eğer boş gönderilirse, detaylarda girilen vergi muafiyeti alanlarından oluşturulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	withholdingTax?: TaxTotal[] | null;
	/** Gider pusulası satırları */
	expenseVoucherDetail?: ExpenseVoucherOutboxDetailModel[] | null;
}

/**
 * Gider pusulası kayıt sonuç modeli
 */
export interface ExpenseVoucherOutboxResultModel {
	/** Belge numarası */
	docNo?: string | null;
	/** Belge ETTN */
	ettn?: string | null;
}

export interface ExpenseVoucherOutboxResultModelResultModel {
	data?: ExpenseVoucherOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gider pusulası durum sonuç modeli
 */
export interface ExpenseVoucherOutboxStatusResultModel {
	/** Kayıt Id */
	id?: number;
	/** Gider pusulası ETTN */
	expenseVoucherETTN?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** Durum metni */
	expenseVoucherStatusText?: string | null;
	/** Hata açıklaması (durum HATA ise dolar) */
	errorDescription?: string | null;
}

export interface ExpenseVoucherOutboxStatusResultModelListResultModel {
	data?: ExpenseVoucherOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface ExpenseVoucherOutboxStatusResultModelResultModel {
	data?: ExpenseVoucherOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface FaturaDonemi {
	baslangicTarihi?: string;
	bitisTarihi?: string;
}

export interface FaturaKalemi {
	tedarikciStokNo?: string | null;
	musteriStokNo?: string | null;
	stokAdi?: string | null;
	aciklama?: string | null;
	miktar?: number;
	birim?: string | null;
	birimFiyat?: number;
	dovizTipi?: string | null;
	toplamTutar?: number;
	iskontoOrani?: number;
	iskontoTutari?: number;
	kdvMuafiyetNedeni?: string | null;
	kdvOrani?: number;
	kdvTutari?: number;
	kkdfKesintiMuafiyetNedeni?: string | null;
	kkdfKesintiOrani?: number;
	kkdfKesintiTutari?: number;
	petrolDogalgazOTVMuafiyetNedeni?: string | null;
	petrolDogalgazOTVOrani?: number;
	petrolDogalgazOTVTutari?: number;
	dayanikliTuketimOTVMuafiyetNedeni?: string | null;
	dayanikliTuketimOTVOrani?: number;
	dayanikliTuketimOTVTutari?: number;
	alkolluIcecekOTVMuafiyetNedeni?: string | null;
	alkolluIcecekOTVOrani?: number;
	alkolluIcecekOTVTutari?: number;
	tutunMamulleriOTVMuafiyetNedeni?: string | null;
	tutunMamulleriOTVOrani?: number;
	tutunMamulleriOTVTutari?: number;
	kolaliGazozOTVMuafiyetNedeni?: string | null;
	kolaliGazozOTVOrani?: number;
	kolaliGazozOTVTutari?: number;
	dvMuafiyetNedeni?: string | null;
	dvOrani?: number;
	dvTutari?: number;
	dvKanun5035MuafiyetNedeni?: string | null;
	dvKanun5035Orani?: number;
	dvKanun5035Tutari?: number;
	oivMuafiyetNedeni?: string | null;
	oivOrani?: number;
	oivTutari?: number;
	oivKanun5035MuafiyetNedeni?: string | null;
	oivKanun5035Orani?: number;
	oivKanun5035Tutari?: number;
	kdvTevkifatMuafiyetNedeni?: string | null;
	kdvTevkifatOrani?: number;
	kdvTevkifatTutari?: number;
	bsmvMuafiyetNedeni?: string | null;
	bsmvOrani?: number;
	bsmvTutari?: number;
	motorluTasitlarOTVMuafiyetNedeni?: string | null;
	motorluTasitlarOTVOrani?: number;
	motorluTasitlarOTVTutari?: number;
	borsaTescilUcretMuafiyetNedeni?: string | null;
	borsaTescilUcretOrani?: number;
	borsaTescilUcretTutari?: number;
	enerjiFonuMuafiyetNedeni?: string | null;
	enerjiFonuOrani?: number;
	enerjiFonuTutari?: number;
	belediyeTuketimVergisiMuafiyetNedeni?: string | null;
	belediyeTuketimVergisiOrani?: number;
	belediyeTuketimVergisiTutari?: number;
	trtPayiMuafiyetNedeni?: string | null;
	trtPayiOrani?: number;
	trtPayiTutari?: number;
	elektrikTuketimVergisiMuafiyetNedeni?: string | null;
	elektrikTuketimVergisiOrani?: number;
	elektrikTuketimVergisiTutari?: number;
	stopajMuafiyetNedeni?: string | null;
	stopajOrani?: number;
	stopajTutari?: number;
	telsizKullanimAylikTaksitMuafiyetNedeni?: string | null;
	telsizKullanimAylikTaksitOrani?: number;
	telsizKullanimAylikTaksitTutari?: number;
	telsizRuhsatUcretiMuafiyetNedeni?: string | null;
	telsizRuhsatUcretiOrani?: number;
	telsizRuhsatUcretiTutari?: number;
	cevreTemizlikVergisiMuafiyetNedeni?: string | null;
	cevreTemizlikVergisiOrani?: number;
	cevreTemizlikVergisiTutari?: number;
	cevrimDovizTipi?: string | null;
	cevrimDovizKuru?: number;
	vergiler?: Vergi[] | null;
	ekSahalar?: EkSaha[] | null;
	ureticiStokNo?: string | null;
	model?: string | null;
	iskontoAciklama?: string | null;
	kdvMatrahi?: number;
	kkdfKesintiMatrahi?: number;
	petrolDogalgazOTVMatrahi?: number;
	dayanikliTuketimOTVMatrahi?: number;
	alkolluIcecekOTVMatrahi?: number;
	tutunMamulleriOTVMatrahi?: number;
	kolaliGazozOTVMatrahi?: number;
	dvMatrahi?: number;
	dvKanun5035Matrahi?: number;
	oivMatrahi?: number;
	oivKanun5035Matrahi?: number;
	kdvTevkifatMatrahi?: number;
	bsmvMatrahi?: number;
	motorluTasitlarOTVMatrahi?: number;
	borsaTescilUcretMatrahi?: number;
	enerjiFonuMatrahi?: number;
	belediyeTuketimVergisiMatrahi?: number;
	trtPayiMatrahi?: number;
	elektrikTuketimVergisiMatrahi?: number;
	stopajMatrahi?: number;
	telsizKullanimAylikTaksitMatrahi?: number;
	telsizRuhsatUcretiMatrahi?: number;
	cevreTemizlikVergisiMatrahi?: number;
	gonderilenMalAdedi?: number;
	gonderilenMalAdediBirim?: string | null;
	ilerikiTarihteGonderilecekMalAdedi?: number;
	ilerikiTarihteGonderilecekMalAdediBirim?: string | null;
	ilerikiTarihteMalGondermeNedenleri?: string[] | null;
	teslimAlinanMalAdedi?: number;
	teslimAlinanMalAdediBirim?: string | null;
	eksikMalAdedi?: number;
	eksikMalAdediBirim?: string | null;
	fazlaMalAdedi?: number;
	fazlaMalAdediBirim?: string | null;
	kabulEdilmeyenMalAdedi?: number;
	kabulEdilmeyenMalAdediBirim?: string | null;
	maliReddetmeNedenleri?: string[] | null;
	gecTeslimSikayetAciklamasi?: string | null;
	siparisSiraNo?: string | null;
}

/**
 * Finans Detay Model
 */
export interface FinanceDetailModel {
	/** Eğer seçilen fiş tipi "GENEL SERBEST İŞLEM" veya "DEVİR" ise bu alanda İşlem Tipi bilgisi girilir, zorunludur. Diğer fiş tiplerinde değer girilmez. */
	plusMinus?: string | null;
	/** Kart türü bilgisidir. Seçilen fiş tipine bağlı olarak seçilebilecek kart türü değerleri değişmektedir. */
	cardType?: string | null;
	/** Girilecek kart kodu bilgisi seçilen fiş tipi veya kart türü bilgisine göre değişkenlik gösterir. */
	cardCode: string;
	/** Finans fiş detay açıklama bilgisidir. */
	note?: string | null;
	/** Belge tutar bilgisidir.decimal precision : number(18,2) */
	amtTra: number;
	/** Para birimi kod bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir.Girilen para birimi kodu "TRY" ise boş bırakabilirsiniz. */
	currencyRate?: number;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Finans fiş detayı kategori ad bilgisidir.**Portalda bulunan kategori tanımlarınızdaki tam adı giriniz. */
	categoryName?: string | null;
}

/**
 * Finans liste sorgu model
 */
export interface FinanceDetailedListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Finans fiş tarihi başlangıç alanıdır. */
	docDateStart: string;
	/** Finans fiş tarihi bitiş alanıdır. */
	docDateEnd: string;
	/** İşlem yapılan kart tipi bilgisidir. Hesap Planı, Müşteri/Tedarikçi, Banka, Kasa */
	cardType: string;
	/** Kart kodu başlangıç alanıdır. */
	cardCodeStart?: string | null;
	/** Kart kodu bitiş alanıdır. */
	cardCodeEnd?: string | null;
}

/**
 * Detalı finans listesi nesnesi
 */
export interface FinanceDetailedListResultModel {
	/** Finans tablosunun tekil alanıdır. */
	financeId?: number;
	/** Finans detay tablosunun tekil alanıdır. */
	financeDetailId?: number;
	/** Belge tarihi bilgisidir. */
	docDate?: string;
	/** Belge numarası bilgisidir. */
	docNo?: string | null;
	/** Finans fişinin oluştuğu kaynak bilgisidir. */
	transactionSourceEnumText?: string | null;
	/** Finans fiş tipi bilgisidir. */
	documentTransactionTypeName?: string | null;
	/** Fişe ait etiket bilgisidir. */
	categoryName?: string | null;
	/** Finans hareket kodu bilgisidir. */
	financeTransactionTypeCode?: string | null;
	/** Finans hareket adı bilgisidir. */
	financeTransactionTypeName?: string | null;
	/** İşlem yapılan kart türü bilgisidir. */
	cardTypeEnumText?: string | null;
	/** İşlem yapılan kartın Id bilgisidir. */
	cardId?: number;
	/** İşlem yapılan kart kod bilgisidir */
	cardCode?: string | null;
	/** İşlem yapılan kartın ad bilgisidir. */
	cardName?: string | null;
	/** İşlem yapılan kartın, finans sürecindeki diğer karşılık gelen kartın tür bilgisidir. */
	otherCardTypeEnumText?: string | null;
	/** İşlem yapılan kartın, finans sürecindeki diğer karşılık gelen kartın Id bilgisidir. */
	otherCardId?: number | null;
	/** İşlem yapılan kartın, finans sürecindeki diğer karşılık gelen kartın kod bilgisidir. */
	otherCardCode?: string | null;
	/** İşlem yapılan kartın, finans sürecindeki diğer karşılık gelen kartın ad bilgisidir. */
	otherCardName?: string | null;
	/** Finans fiş detay işlem tipi bilgisidir.(Borç,Alacak) */
	plusMinus?: number;
	/** Finans fiş detayı para birimi cinsinden tutar bilgisidir. */
	amt?: number;
	/** Finans fiş detayı girilen tutar bilgisidir. */
	amtTra?: number;
	/** Finans fiş detayı para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Finans fiş detayı kur bilgisidir. */
	currencyRate?: number;
	/** Fiş detay para birimi cinsinden borç tutarı bilgisidir. */
	debitAmt?: number;
	/** Fiş detay para birimi cinsinden alacak tutarı bilgisidir. */
	creditAmt?: number;
	/** Fiş detay borç tutarı bilgisidir. */
	debitAmtTra?: number;
	/** Fiş detay alacak tutarı bilgisidir. */
	creditAmtTra?: number;
	/** Vade tarihi bilgisidir. */
	dueDate?: string | null;
	/** Finans fiş not bilgisidir */
	note?: string | null;
	/** Finans fiş not bilgisidir */
	note2?: string | null;
	/** Finans fiş detayı açıklama bilgisidir. */
	detailNote?: string | null;
}

export interface FinanceDetailedListResultModelQueryResultList {
	data?: FinanceDetailedListResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Finans Model
 */
export interface FinanceModel {
	/** Fiş tipi kod bilgisidir. */
	financeTransactionTypeCode: string;
	/** Seçilen fiş tipi bilgisine göre girilen Kasa, Banka, Hesap veya Müşteri/Tedarikçi kart kodu bilgisidir. */
	cardCode?: string | null;
	/** Belge tarihi bilgisidir. */
	docDate: string;
	/** Belge numarası bilgisidir. */
	docNo: string;
	/** Finans fişi açıklama bilgisidir. */
	note?: string | null;
	/** Finans fişi 2. açıklama bilgisidir. */
	note2?: string | null;
	/** Eğer finans fişi ile portal fatura eşleştirilmek isteniyorsa bu alan kullanılabilir */
	invoiceId?: number | null;
	/** Finans fişi detay bilgileridir. Bir veya birden fazla kalem olacak şekilde girilebilir. */
	financeDetail: FinanceDetailModel[];
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Ödeme detay bilgileri
 */
export interface FinancialAccount {
	/** Para birimi kodu */
	currencyCode?: string | null;
	/** Hesap no */
	iD?: string | null;
	/** Ödeme notu */
	paymentNote?: string | null;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım Belgesine ISTATISTIKNO, GELDIGIULKE, GELISNEDENI,FATURANO yazılacaktır.
 */
export interface ForeignExchangeDocumentConstant {
	/** e-Döviz ve Kıymetli Maden Alım/Satım belgesine eklenecek geldiği ülke bilgisi(GELDIGIULKE) */
	countryFromName?: string | null;
	/** e-Döviz ve Kıymetli Maden Alım/Satım belgesine eklenecek geldiği ülke bilgisi(GELDIGIULKE) */
	countryFromCode?: string | null;
	/** e-Döviz ve Kıymetli Maden Alım/Satım belgesine eklenecek geliş nedeni (GELISNEDENI) */
	comingReason?: string | null;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım belgesi ihracat ya da yabancı sermaye bedeli için düzenlendiği durumda, yukarıdaki bilgilere ek olarak
 * Gümrük Beyanname Tarih/No,
 * Döviz Beyan Tutanağı Tarih/Sayı,
 * Gümrük Müdürlüğü Teyit Yazısı Tarih/Sayı bilgilerini ifade eden sırasıyla
 * GBTARIHI, GBNO, DBTTARIH, DBTSAYI, GMTYTARIH, GMTYSAYI yazılacaktır.
 */
export interface ForeignExchangeDocumentConstantForExport {
	/** Gümrük Beyanname Tarih (GBTARIHI) */
	customsDeclerationDate?: string | null;
	/** Gümrük Beyanname No (GBNO) */
	customsDeclerationNo?: string | null;
	/** Döviz Beyan Tutanağı Tarih (DBTTARIH) */
	exchangeStatementFormDate?: string | null;
	/** Döviz Beyan Tutanağı Sayı (DBTSAYI) */
	exchangeStatementFormNo?: number;
	/** Gümrük Müdürlüğü Teyit Yazısı Tarih (GMTYTARIH) */
	customsOfficeConfirmationDate?: string | null;
	/** Gümrük Müdürlüğü Teyit Yazısı Sayı (GMTYSAYI) */
	customsOfficeConfirmationNo?: number;
	/** e-Döviz belgesine eklenecek fatura No(FATURANO) */
	invoiceNo?: string | null;
}

/**
 * Döviz belgesi Ubl XML gönderim sınıfı
 */
export interface ForeignExchangeForUblXmlModel {
	/** Döviz belgesinin ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	creditNoteTypeUblString?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-döviz alım veya e-döviz satım belge numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

/**
 * Döviz belgesi başlık bilgisi
 */
export interface ForeignExchangeHeaderInfoModel {
	/** Döviz belge Id alanıdır */
	id?: number;
	/** Döviz belge tipi bilgisidir. */
	creditNoteTypeCode?: string | null;
	/** Döviz belgesi durum açıklaması */
	foreignExchangeStatusText?: string | null;
	/** Döviz belgesinin evrensel tekil tanımlama numarasıdır. */
	ettn?: string | null;
	/** Döviz belgesi numarası bilgisidir. */
	docNo?: string | null;
	/** Döviz Belge Tarihi alanıdır */
	docDate?: string;
	/** VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Mal/hizmet miktarı ile Mal/hizmet birim fiyatının çarpımı ile bulunan tutarlar toplamıdır. */
	lineExtensionAmount?: number;
	/** Vergiler hariç, ıskonto veya artırım dahil toplam tutarıdır. */
	taxExclusiveAmount?: number;
	/** Vergiler, ıskonto ve artırım dahil toplam tutarıdır. */
	taxInclusiveAmount?: number;
	/** Yuvarlama tutarıdır. */
	payableRoundingAmount?: number;
	/** Ödenecek tutardır. */
	payableAmount?: number;
	/** Belgenin sistemde oluşturulma zamanı */
	createDate?: string;
}

export interface ForeignExchangeHeaderInfoModelListResultModel {
	data?: ForeignExchangeHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım belge tutarlarını gösterir
 */
export interface ForeignExchangeLegalMonetaryTotal {
	/** Döviz bürosundan alınan para / Kıymetli Maden (Bu alana, Alım belgelerinde, TRY tutarı, Satım belgelerinde ise ilgili döviz tutarı veya kıymetli maden miktarı yazılır) */
	lineExtensionAmount?: number;
	/** Vergiler hariç TRY tutar */
	taxExclusiveAmount?: number;
	/** Vergiler dahil TRY tutar */
	taxInclusiveAmount?: number;
	/** Döviz bürosuna verilen para / Kıymetli Maden (Bu alana, Alım belgelerinde ilgili döviz tutarı / kıymetli maden miktarı, Satım belgelerinde ise TRY tutarı girilir) */
	payableAmount?: number;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım Belgesine konu dövizi alan/satan taraf bilgileri için bu eleman kullanılacaktır.
 */
export interface ForeignExchangeOutboxCustomerAccountModel {
	/** Alıcı VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Pasaport numarası - TC vatandaşı olmayanlar için kullanılabilir */
	passportNo?: string | null;
	/** Müşteri türü bilgisine “BANKA”, “GERCEKKISI”,“TUZELKISI”, “YETKILIMUESSESE” yazılacaktır. */
	customerType?: string | null;
	/** Alıcı unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Alıcı Adı */
	firstName?: string | null;
	/** Alıcı Soyadı */
	familyName?: string | null;
	/** Alıcı Uyruğu */
	nationality?: string | null;
	/** Alıcı vergi dairesi adı bilgisidir. */
	taxOfficeName?: string | null;
	/** Müşteri-Tedarikçi Ülke Adı alanıdır */
	countryName?: string | null;
	/** Müşteri-Tedarikçi Şehir Adı alanıdır */
	cityName?: string | null;
	/** İç kapı numarası bilgisidir. */
	room?: string | null;
	/** Meydan/bulvar/cadde adı bilgisidir. */
	streetName?: string | null;
	/** Blok Adı alanıdır */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina veya bloğa ait dış kapı numarası bilgisidir. */
	buildingNumber?: string | null;
	/** Semt alanıdır */
	citySubdivision?: string | null;
	/** Posta Kodu alanıdır */
	postalCode?: string | null;
	/** Kasaba/köy/mezra/mevkii bilgisidir. */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email1?: string | null;
	/** Alıcının web sayfası adresi bilgisidir. */
	webSiteUrl?: string | null;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım Giden Kutusu Belgesi
 */
export interface ForeignExchangeOutboxModel {
	/** e-Döviz ve Kıymetli Maden Alım/Satım Belge numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,boş ise varsayılan ön ek değeriniz üzerinden belge numarası atanır. Örnek:DSB2021000000001, 3 hane ön ek, 4 hane yıl bilgisi, 9 belge numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** e-Döviz ve Kıymetli Maden Alım/Satım numarası ön ek bilgisidir.Örn:DSB Sistem tarafından belge numarası veriyorsa ve sistem üzerinde birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden belge numarası atanır. */
	prefix?: string | null;
	/** Evrensel Tekil Tanımlama Numarası(ETTN). Boş geçilir ise, sistem otomatik olarak bir ettn üretecektir. */
	ettn?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Düzenleme Tarihi */
	docDate: string;
	/** Düzenleme Zamanı */
	docTime?: string;
	/** Belgenin Kıymetli Maden yada Döviz belgesi olduğunu belirtir. EDOVIZBELGE yada EKIYMETLIMADENBELGE değerlerini alabilir. Boş gönderilirse EDOVIZBELGE olarak kabul edilir. */
	profileId?: string | null;
	/** Bu eleman belgenin alım yada satım belgesi olduğunu belirtir. ALIM ya da SATIM değerlerini alabilir. */
	creditNoteTypeCode: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Şube bazında kayıt yetkilendirmesi yapmak için kullanılabilecek alandır. Bu alana her şube için ayrı bir kod yazılabilir. Portal tarafında, buraya
 yazılan kodlar üzerinden kullanıcılara yetkilendirme yapılabilmektedir. */
	folderId?: string | null;
	/** e-Döviz ve Kıymetli Maden Alım/Satım Belgesi Mysoft sistemlerine gönderilmeden önce şematron kontrolleri yapılması isteniyorsa bu parametre false geçilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Özel oluşturulmuş belge görünümünüz var ise, bu belge görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm var mı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-döviz alım veya e-döviz satım belge numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** e-Döviz ve Kıymetli Maden Alım/Satım Belgesine eklenecek istatistik numarası(ISTATISTIKNO) */
	statisticNo?: string[] | null;
	supplierAgentAccount?: AgentAccountModel;
	/** e-Döviz ve Kıymetli Maden Alım/Satım not alanıdır. Birden fazla açıklama satırı yazılabilir. */
	notes?: NoteModel[] | null;
	forexDocumentConstant?: ForeignExchangeDocumentConstant;
	forexDocumentConstantForExport?: ForeignExchangeDocumentConstantForExport;
	accountCustomer: ForeignExchangeOutboxCustomerAccountModel;
	paymentMeans?: ForeignExchangePaymentMeans;
	pricingExchangeRate?: ForeignExchangePricingExchangeRate;
	paymentExchangeRate: ForeignExchangePaymentExchangeRate;
	legalMandatoryTotal?: ForeignExchangeLegalMonetaryTotal;
	tax?: ForeignExchangeOutboxTax;
}

/**
 * e-Döviz belgesi sonuç durumu
 */
export interface ForeignExchangeOutboxResultModel {
	/** Evrensel Tekil Tanımlama Numarası(ETTN). Oluşturulan döviz alım satım belgesinin ettnsi */
	ettn?: string | null;
	/** Döviz Alım-Satım Belgesi Numarası. Oluşturulan döviz alım satım belgesinin belge numarası */
	docNo?: string | null;
}

export interface ForeignExchangeOutboxResultModelResultModel {
	data?: ForeignExchangeOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden döviz belgesinin durumunu belirten sınıftır.
 */
export interface ForeignExchangeOutboxStatusResultModel {
	/** Giden e-döviz Id */
	id?: number;
	/** e-döviz ETTN */
	ettn?: string | null;
	/** e-döviz Belge Numarası */
	docNo?: string | null;
	/** döviz belge durum açıklaması */
	foreignExchangeStatusText?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
	/** Belge Tipi (DOVIZALIMBELGESI(1),DOVIZSATIMBELGESI(2)) */
	creditNoteTypeCode?: string | null;
}

export interface ForeignExchangeOutboxStatusResultModelListResultModel {
	data?: ForeignExchangeOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface ForeignExchangeOutboxStatusResultModelResultModel {
	data?: ForeignExchangeOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Vergi ile ilgili alanlar
 */
export interface ForeignExchangeOutboxTax {
	/** BSMV vergi tutarı */
	taxAmountBSMV?: number;
	/** BSMV vergilendirilen tutar */
	taxableAmountBSMV?: number;
	/** BSMV vergi oranı */
	taxRateBSMV?: number;
	/** KDV vergi tutarı */
	taxAmountKDV?: number;
	/** KDV vergilendirilen tutar (Kıymetli Maden Satım işlemlerinde işçilik tutarıdır) */
	taxableAmountKDV?: number;
	/** KDV vergi oranı */
	taxRateKDV?: number;
}

/**
 * Verilen ve karşılığında alınan Döviz/Kıymetli Maden cinsleri karşılığı
 */
export interface ForeignExchangePaymentExchangeRate {
	/** Döviz işlemlerinde, Döviz bürosunun aldığı para birimi ( Döviz Alım Belgesinde-->işlem döviz para birim kodu, Döviz Satım Belgesinde ise "TRY" yazılır.).
 Kıymetli Maden işlemlerinde, herzaman TRY olarak atılmalıdır. */
	sourceCurrencyCode: string;
	/** Döviz işlemlerinde, Döviz bürosunun verdiği para birimi ( Döviz Alım Belgesinde--> "TRY", Döviz Satım Belgesinde ise işlem döviz para birim kodu yazılır.)
 Kıymetli Maden işlemlerinde, kıymetli madenin cinsi yazılır. */
	targetCurrencyCode: string;
	/** Kur bilgisi (Döviz işlemlerinde ; Buraya yazılacak kur bilgisi, Döviz Alım Belgesinde işlem yapılan 1 birim dövizin TRY cinsinden kur karşılığı yazılır,Döviz Satım Belgesinde ise 
 1 TRY nin ilgili döviz cinsinden kur karşılığı yazılır. Kıymetli Maden Alım/Satım işlemlerinde; 1 TRY nin ilgili kıymetli maden karşılığı yazılır) */
	calculationRate: number;
	/** İlgili kurun tarihi */
	rateDate?: string | null;
}

/**
 * e-Döviz ve Kıymetli Maden Alım/Satım belgesi banka bilgileri
 */
export interface ForeignExchangePaymentMeans {
	/** Ödeme tipi - (1-Ödeme tipi muhtelif,10-Nakit, 20-Çek,23-Banka Çeki, 42-Havale/EFT, 48-Kredi/Banka Kartı, ZZZ-Diğer) */
	paymentMeansCode?: string | null;
	/** Dosya No Şube Kodu (DosyaNo-Şube Kodu şekilde girilecektir.) (Yetkili Müessese Bilgi Sistemi (YMBS)’de “Şirket Profili” sekmesinden görüntülenebilmektedir.) */
	payeeFinancialAccountFileNoBranchCode?: string | null;
	/** Banka Şube Kodu */
	payerFinancialAccountBranchCode?: string | null;
}

/**
 * Döviz Alım-Satım işlemlerinde USD karşılığı girilir. Kıymetli Maden Alım işlemlerinde boş gönderilir. Kıymetli Maden Satım işlemlerinde calculationRate alanına has altın cinsinden oran girilir.
 */
export interface ForeignExchangePricingExchangeRate {
	/** İşlem yapılan döviz para birim kodu yazılır. Kıymetli Maden Satım işlemlerinde bu alana TRY gönderilmelidir. */
	sourceCurrencyCode: string;
	/** Hedef para birimi (USD). Herzaman USD olmalıdır. Kıymetli Maden Satım işlemlerinde bu alana ilgili kıymetli maden birimi gönderilmelidir. */
	targetCurrencyCode: string;
	/** Kur bilgisi. Kıymetli Maden Satım işlemlerinde 1 TRY’ ye, ilgili 1 birim Kıymetli Madenin has altın karşılığından ne kadar karşılık geldiğini belirten orandır.
 Örnek: 1 Adet Çeyrek Has Altın Karşılığı : 2215 TRY ise, calculationRate  alanına 0,00045146 (1 / 2215) yazılacaktır. */
	calculationRate: number;
	/** İlgili kurun tarihi */
	rateDate?: string | null;
}

/**
 * GeneralLookupModel
 */
export interface GeneralLookupModel {
	/** Kodu alanıdır */
	code?: string | null;
	/** Adı alanıdır */
	name?: string | null;
}

/**
 * GeneralLookupNameModel
 */
export interface GeneralLookupNameModel {
	/** Adı alanıdır */
	name?: string | null;
}

/**
 * GetBillDocumentOutboxListRequestModel
 */
export interface GetBillDocumentOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
}

/**
 * Adisyon Değişim durumlarını dönen request sınıfı.
 */
export interface GetBillDocumentOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İlgili Tarihler için gelen irsaliye listesini veren parametre sınıfı
 */
export interface GetDespatchInboxListForPeriodPagingRequestModel {
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** İrsaliyenin hangi posta kutusuna geldiği bilgisidir */
	pkAlias?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** irsaliye düzenleyen firmanın VKN/TCKN'si */
	vknTckn?: string | null;
	/** Filtre olarak İrsaliyenin oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Arşivlenmiş kayıtların listeleme durumunu belirtir. (0-Hepsi,1-Sadece arşivlenmiş olanlar,2-Arşivlenmiş olmayanlar) */
	archiveStatus?: number | null;
	/** Bir sayfada olacak kayıt sayısını belirtir. Max 1000 */
	pageSize?: number;
	/** Hangi sayfanın istendiğini belirtir. Sayfalar 1 den başlar. */
	pageNumber?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İlgili Tarihler için gelen irsaliye listesini veren parametre sınıfı
 */
export interface GetDespatchInboxListForPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** İrsaliyenin hangi posta kutusuna geldiği bilgisidir */
	pkAlias?: string | null;
	/** Filtre olarak İrsaliyenin oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
}

/**
 * İlgili Tarihler için giden irsaliye listesini veren parametre sınıfı
 */
export interface GetDespatchOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İrsaliye Değişim durumlarını dönen request sınıfı. Başlangıç, Bitiş Tarihi aralığı en fazla 1 gün olabilir.
 */
export interface GetDespatchOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İlgili Tarihler için gelen e-Arşiv fatura listesini veren parametre sınıfı
 */
export interface GetEArchiveDocumentInboxPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Devir kayıtlarının listeleme durumunu belirtir. (0-Hepsi,1-Sadece devir olanlar,2-Devir olmayanlar) */
	cessionStatus?: number | null;
}

/**
 * İlgili Tarihler için 5000/30000 fatura listesini veren parametre sınıfı
 */
export interface GetEArchiveInboxListForPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Daha önce çekilen kayıtlarında istenip istenmediğini belirtir. true geçilirse tüm kayıtlar gelir. false geçilirse sadece aktarılmamış kayıtlar listelenir. */
	isAll?: boolean | null;
}

/**
 * Gider pusulası liste sorgulama isteği modeli
 */
export interface GetExpenseVoucherOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Filtre olarak belgenin oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
}

/**
 * Durum değişen gider pusulası belgelerini sorgulama isteği modeli
 */
export interface GetExpenseVoucherOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İlgili Tarihler için döviz belgesi listesini veren parametre sınıfı
 */
export interface GetForeignExchangeOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Belge Tipi (ALIM,SATIM) */
	creditNoteTypeCode?: string | null;
	/** Filtre olarak döviz belgesinin oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
}

/**
 * Döviz belge değişim durumlarını dönen request sınıfı. Başlangıç, Bitiş Tarihi aralığı en fazla 1 gün olabilir.
 */
export interface GetForeignExchangeOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İlgili Tarihler için gelen fatura listesini veren parametre sınıfı
 */
export interface GetInvoiceInboxListForPeriodPagingRequestModel {
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Faturanın hangi posta kutusuna geldiği bilgisidir */
	pkAlias?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** Fatura ETTN */
	ettn?: string | null;
	/** Fatura durumu (0-Hepsi, 1-Kabul,2-Red,3-Yanıt Bekleniyor,4-Kabul Kuyruğunda, 5-Red Kuyruğunda) */
	portalInvoiceStatus?: number;
	/** Fatura Türü (0-Hepsi, 1-Temel Fatura, 2-Ticari Fatura, 3-Kamu, 4-Hks,5-Enerji,6-İlaçTıbbiCihaz) */
	profile?: number;
	/** Faturayı düzenleyen firmanın VKN/TCKN'si */
	vknTckn?: string | null;
	/** Faturayı düzenleyen firmanın ünvanı(İçinde geçen şeklinde aranır) */
	accountName?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Devir kayıtlarının listeleme durumunu belirtir. (0-Hepsi,1-Sadece devir olanlar,2-Devir olmayanlar) */
	cessionStatus?: number | null;
	/** Arşivlenmiş kayıtların listeleme durumunu belirtir. (0-Hepsi,1-Sadece arşivlenmiş olanlar,2-Arşivlenmiş olmayanlar) */
	archiveStatus?: number | null;
	/** Bir sayfada olacak kayıt sayısını belirtir. Max 1000 */
	pageSize?: number;
	/** Hangi sayfanın istendiğini belirtir. Sayfalar 1 den başlar. */
	pageNumber?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İlgili Tarihler için gelen fatura listesini veren parametre sınıfı
 */
export interface GetInvoiceInboxListForPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Faturanın hangi posta kutusuna geldiği bilgisidir */
	pkAlias?: string | null;
	/** Fatura ettn */
	ettn?: string | null;
	/** Faturayı düzenleyen firmanın VKN/TCKN'si */
	vknTckn?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Devir kayıtlarının listeleme durumunu belirtir. (0-Hepsi,1-Sadece devir olanlar,2-Devir olmayanlar) */
	cessionStatus?: number | null;
}

/**
 * İlgili Tarihler için giden fatura listesini veren parametre sınıfı
 */
export interface GetInvoiceListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Belge Tipi (EFATURA,EARSIVFATURA,ESMM,EMM) */
	eDocumentType?: string | null;
	/** Fatura düzenlenen firmanın VKN/TCKN'si */
	vknTckn?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Sadece Taslak kayıtlar çekilmek isteniyorsa bu parametre true olarak atanır. Varsayılan olarak tüm kayıtlar dönülür. */
	isDraft?: boolean;
}

/**
 * İlgili Tarihler için giden fatura listesini veren parametre sınıfı
 */
export interface GetInvoiceOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Belge Tipi (EFATURA,EARSIVFATURA,ESMM,EMM) */
	eDocumentType?: string | null;
	/** Fatura düzenlenen firmanın VKN/TCKN'si */
	vknTckn?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
	/** Devir kayıtlarının listeleme durumunu belirtir. (0-Hepsi,1-Sadece devir olanlar,2-Devir olmayanlar) */
	cessionStatus?: number | null;
}

/**
 * Fatura Değişim durumlarını dönen request sınıfı. Başlangıç, Bitiş Tarihi aralığı en fazla 1 gün olabilir.
 */
export interface GetInvoiceOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İlgili Tarihler için gelen irsaliye yanıt listesini veren parametre sınıfı
 */
export interface GetReceiptInboxListForPeriodRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
	/** Faturanın hangi posta kutusuna geldiği bilgisidir */
	pkAlias?: string | null;
	/** Filtre olarak Faturanın oluşturulma tarihi yerine belge tarihini kullan */
	isUseDocDate?: boolean | null;
}

/**
 * İlgili Tarihler için giden irsaliye listesini veren parametre sınıfı
 */
export interface GetReceiptOutboxListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * İrsaliye Yanıtı Değişim durumlarını dönen request sınıfı. Başlangıç, Bitiş Tarihi aralığı en fazla 1 gün olabilir.
 */
export interface GetReceiptOutboxStatusChangedRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi */
	startDate?: string | null;
	/** Bitiş Tarihi */
	endDate?: string | null;
}

/**
 * GİB Hesap Etiket tanımları
 */
export interface GibAccountAliasModel {
	/** Id */
	id?: number;
	/** GİB Hesap Id */
	gibAccountId?: number;
	/** Etiket */
	alias?: string | null;
	/** Etiket Oluşturulma Tarihi */
	aliasCreateDate?: string;
	/** Etiket Döküman Tipi 1- FATURA, 2- İRSALİYE */
	gibDocumentType?: number;
	/** Etiket silinme tarihi */
	aliasDeleteDate?: string | null;
	/** Etiket Tipi 1 - POSTA KUTUSU , 2 - GÖNDERİCİ BİRİM */
	aliasType?: number;
}

/**
 * GİB Hesap Tanımı
 */
export interface GibAccountModel {
	/** GİB hesap veritabanı Id */
	id?: number;
	/** Hesap Adı */
	gibAccountName?: string | null;
	/** Hesap Tipi (1-TÜZEL, 2-ŞAHIS) */
	gibAccountType?: number | null;
	/** VKN-TCKN */
	identifierNumber?: string | null;
	/** E-Fatura başlangıç tarihi */
	eInvoiceStartDate?: string | null;
	/** E-İrsaliye başlangıç tarihi */
	eWaybillStartDate?: string | null;
	/** Hesap Kullanım Tipi - 1-GİB PORTAL, 2 - ENTEGRASYON , 3 - ÖZEL ENTEGRASYON */
	gibAccountUsageType?: number;
	/** Hesap Tipi (1-ÖZEL, 2-KAMU) */
	gibUserType?: number;
	/** Pasif mi */
	isPassive?: boolean;
	/** Son Güncellenme Tarihi */
	lastUpdateDate?: string | null;
	/** GİB Hesap Etiket listesi */
	gibAccountAliasList?: GibAccountAliasModel[] | null;
}

export interface GibAccountModelListResultModel {
	data?: GibAccountModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface GibAccountModelResultModel {
	data?: GibAccountModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gib E-Arşiv fatura iptal işlem objesi
 */
export interface GibInvoiceCancellationModel {
	/** Gib E-Arşiv fatura ETTN numarası */
	invoiceEttn?: string | null;
	/** İptal sebebi */
	cancellationReason?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Gib E-Arşiv genel işlem fatura objesi
 */
export interface GibInvoiceOperationModel {
	/** Gib E-Arşiv fatura ETTN numarası */
	invoiceEttn?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Gib E-Arşiv fatura sms onay objesi
 */
export interface GibInvoiceSmsConfirmModel {
	/** Gib E-Arşiv fatura ETTN numarası */
	invoiceEttn?: string | null;
	/** Gib E-Arşiv fatura portalına fatura gönderim işlemi veya sms onay kodu talep işlemi ile alınan sms onay Id'si */
	confirmId?: string | null;
	/** Gib E-Arşiv fatura portalı tarafında ilgili telefona sms olarak gönderilen onay kodu */
	confirmCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Gib E-Arşiv sms talep objesi
 */
export interface GibInvoiceSmsRequestModel {
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

export interface Gonderi {
	kargoNo?: string | null;
	urunToplamTutar?: number;
	gonderiFazlari?: GonderiFazi[] | null;
	teslimat?: Teslimat;
	tasimaUniteleri?: TasimaUnitesi[] | null;
}

export interface GonderiFazi {
	tasimaSekli?: TasimaSekli;
	suruculer?: Sahis[] | null;
}

export type GonderimTipi = 0 | 1;

export interface HavaTasimaciligi {
	havaAraciNo?: string | null;
}

/**
 * Genel özellik
 */
export interface IdentificationType {
	/** SchemaId */
	schemaId?: string | null;
	/** Value */
	value?: string | null;
}

/**
 * Iframe ile otomatik giriş bilgileri
 */
export interface IframeLoginModel {
	/** Giriş yapacak kullanıcı adı (E-Posta). */
	userName?: string | null;
	/** Giriş yapacak kullanıcı parolası. */
	userPassword?: string | null;
	/** Test portal için bu değer true geçilir. */
	isTestUrl?: boolean;
}

export interface Int32ListResultModel {
	data?: number[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface Int32ResultModel {
	data?: number;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * E-arşiv fatura için ek bilgilerin bulunduğu alandır.(profile ="EARSIVFATURA "olmalıdır.)
 */
export interface InternetShipmentInfoModel {
	/** İnternet satış bilgileri-İnternet adresi bilgisidir. */
	webSiteUrl?: string | null;
	/** İnternet satış bilgileri-Ödeme şekli bilgisidir. string(Enum)("KREDIKARTI/BANKAKARTI", "EFT/HAVALE", "KAPIDAODEME", "ODEMEARACISI", "DIGER") */
	paymentType?: string | null;
	/** İnternet satış bilgileri-Ödeme aracısı bilgisidir. */
	internetAccountName?: string | null;
	/** İnternet satış bilgileri-Ödeme tarihi bilgisidir. */
	paymentDate?: string;
	/** İnternet satış bilgileri-Ödeme şekli açıklaması bilgisidir. */
	paymentNote?: string | null;
	/** Gönderim bilgileri-Gönderim tarihi bilgisidir. */
	shippingDate?: string;
	/** Gönderim bilgileri-Taşıyıcı unvan adı veya ad-soyad bilgisidir. */
	shippingAccountName?: string | null;
	/** Gönderim bilgileri-Taşıyıcı VKN/TCKN bilgisidir. */
	shippingAccountVknTckn?: string | null;
}

/**
 * Yatırım teşvik belgesi bilgisidir. YTBSATIS, YTBISTISNA, YTBIADE, YTBTEVKIFAT ve YTBTEVKIFATIADE fatura tiplerinde zorunludur.
 */
export interface InvesmentIncentiveInfo {
	/** Yatırım Teşvik Belge Numarası */
	investmentIncentiveDocumentNo?: string | null;
	/** Yatırım Teşvik Belge Tarihi */
	investmentIncentiveDocumentDate?: string;
}

/**
 * Fatura Detay AllowanceChartge List Result Model
 */
export interface InvoiceAllowanceChargeResultModel {
	/** İskonto/masraf satırının benzersiz kimlik numarası. */
	id: number;
	/** İlgili faturanın kimliği (üst kayıt). */
	invoiceId: number;
	/** İlgili fatura satırı (detay) kimliği. */
	invoiceDetailId?: number | null;
	/** Satırın masraf mı indirim mi olduğunu belirtir (true=masraf, false=iskonto). */
	chargeIndicator?: boolean;
	/** İskonto veya masrafın nedeni (örnek: promosyon, taşıma bedeli vb.). */
	allowanceChargeReason?: string | null;
	/** İskonto veya masraf oranı (%). */
	multiplierFactorNumeric?: number;
	/** Hesaplama sırası (1, 2, 3 gibi). */
	sequenceNumeric?: number;
	/** Toplam iskonto/masraf tutarı (TRY) */
	amt?: number;
	/** Toplam iskonto/masraf tutarı (Belge Para Birimi) */
	amtTra?: number;
	/** İskonto/masrafın uygulandığı temel tutar (TRY) */
	baseAmt?: number;
	/** Temel tutar, işlem/döviz (Belge Para Birimi) */
	baseAmtTra?: number;
	/** İskonto veya masrafla ilgili açıklama notu. */
	allowanceNote?: string | null;
}

/**
 * Bu elemanda faturadaki çeşitli tutarların toplamları yer alacaktır. isManuelCalculation = true gönderilirse, buradaki rakamlar kullanılır. (dip toplamlar)
 */
export interface InvoiceCalculationModel {
	/** Mal/hizmet miktarı ile Mal/hizmet birim fiyatının çarpımı ile bulunan tutarlar toplamı girilir. */
	lineExtensionAmount?: number;
	/** Vergiler hariç, ıskonto veya artırım dahil toplam tutar girilir. */
	taxExclusiveAmount?: number;
	/** Vergiler, ıskonto ve artırım dahil toplam tutar girilir. */
	taxInclusiveAmount?: number;
	/** Yuvarlama tutarı girilir. */
	payableRoundingAmount?: number;
	/** Ödenecek tutar girilir. */
	payableAmount?: number;
	/** Toplam iskonto tutarı */
	allowanceTotalAmount?: number;
	/** Toplam artırım tutarı */
	chargeTotalAmount?: number;
}

/**
 * Fatura detay ilaç tıbbi cihaz bilgisi
 */
export interface InvoiceDetailDrugAndMedicineInfo {
	/** Küresel Ticari Ürün NUmarası / Ürün Numarası */
	globalProductNumber?: string | null;
	/** Parti/Lot Numarası */
	batchNumber?: string | null;
	/** Seri Sıra Numarası */
	serialNumber?: string | null;
	/** Son Kullanma tarihi */
	expirationDate?: string | null;
}

/**
 * Fatura içerisindeki mail veya hizmet bilgileri alanıdır. Bir veya birden fazla kalem olacak şekilde girilebilir.
 */
export interface InvoiceDetailModel {
	/** Yeni bir stok kartı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewProduct?: boolean;
	product: ProductBaseModel;
	/** Ürün Serino */
	serialNumber?: string | null;
	/** İlaç, Tıbbi cihaz bilgisi. Geçerli Değerler : ILAC, TIBBICIHAZ */
	drugMedicalDeviceType?: string | null;
	/** Fatura Detay İlaç Tıbbi Cihaz Bilgileri */
	invoiceDetailDrugAndMedicineInfoList?: InvoiceDetailDrugAndMedicineInfo[] | null;
	/** Birim kodu bilgisidir. ISO birim kodu yazılmalıdır.Adet için örn: 'C62' gönderilmesi gerekmektedir. */
	unitCode?: string | null;
	/** Birim Adı alanıdır */
	unitName?: string | null;
	/** Miktar alanıdır. decimal precision : number(18,6) */
	qty?: number;
	/** Birim Fiyat alanıdır. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Miktar ile birim fiyatının çarpımı ile bulunan tutardır. decimal precision : number(18,2) */
	amtTra?: number;
	/** İskonto oranı alanıdır. decimal precision : number(18,2) */
	discRate?: number;
	/** İskonto tutarı alanıdır. decimal precision : number(18,2) */
	discAmtTra?: number;
	/** KDV Oranı alanıdır. decimal precision : number(18,2) */
	vatRate?: number;
	/** KDV Tutarı alanıdır. decimal precision : number(18,2). Bu alana Kdv ile ilgili bilgi gönderilirse, Kdv Tax sınıfına ayrıca eklenmemelidir. */
	amtVatTra?: number;
	/** Fatura kalemi için girmek istediğiniz not bilgisidir. Bu alana Kdv ile ilgili bilgi gönderilirse, Kdv Tax sınıfına ayrıca eklenmemelidir. */
	note?: string | null;
	/** Vergi muafiyet kodu invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet adı invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonName?: string | null;
	/** Tevkifat kodu alanıdır */
	withholdingTaxTypeCode?: string | null;
	/** Tevkifat oranı (sadece withholdingTaxTypeCode = 650 olduğu durumlarda değer doldurulabilir). decimal precision : number(18,2) */
	withholdingTaxPercentage?: number;
	/** ÖİV oranı alanıdır. decimal precision : number(18,2) */
	oivRate?: number;
	/** ÖİV tutarı alanıdır. decimal precision : number(18,2). Bu alana ÖİV ile ilgili bilgi gönderilirse, ÖİV Tax sınıfına ayrıca eklenmemelidir. */
	oivAmtTra?: number;
	/** ÖTV kodu alanıdır.  Bu alana ÖİV ile ilgili bilgi gönderilirse, ÖİV Tax sınıfına ayrıca eklenmemelidir. */
	otvCode?: string | null;
	/** ÖTV oranı alanıdır. decimal precision : number(18,2) */
	otvRate?: number;
	/** ÖTV tutarı alanıdır. decimal precision : number(18,2). Bu alana ÖTV ile ilgili bilgi gönderilirse, ÖTV Tax sınıfına ayrıca eklenmemelidir. */
	otvAmtTra?: number;
	/** ÖTV muafiyet kodu alanıdır. decimal precision : number(18,2). Bu alana ÖTV ile ilgili bilgi gönderilirse, ÖTV Tax sınıfına ayrıca eklenmemelidir. */
	otvTaxExemptionReasonCode?: string | null;
	/** Birim fiyata KDV dahil mi bilgisidir. boolean (0,1) Default=False 1:DAHİL 0:HARİÇ */
	isKDVInclude?: boolean;
	/** Satıcı Satır Kodu */
	sellerLineCode?: string | null;
	/** Alıcı Satır Kodu */
	lineCode?: string | null;
	/** GTIP Kodu */
	gTipCode?: string | null;
	/** Ek vergiler bilgileri alanıdır. */
	tax?: InvoiceOutboxDetailTaxModel[] | null;
	/** Fatura Kalemi Sipariş Bilgileri. */
	invoiceDetailOrderLineReference?: InvoiceDetailOrderLineReferenceModel[] | null;
	/** Fatura Kalemi İrsaliye Bilgileri. */
	invoiceDetailReceiptLineReference?: InvoiceDetailReceiptLineReferenceModel[] | null;
}

/**
 * Fatura kalemi sipariş bilgisi objesi
 */
export interface InvoiceDetailOrderLineReferenceModel {
	/** Satınalma Sipariş Numarası */
	purchaseOrderNo?: string | null;
	/** Satınalma Tarihi */
	purchaseOrderDate?: string;
	/** Satış Sipariş Numarası */
	salesOrderNo?: string | null;
	/** Satış Tarihi */
	salesOrderDate?: string | null;
}

/**
 * Fatura kalemi irsaliye bilgisi objesi
 */
export interface InvoiceDetailReceiptLineReferenceModel {
	/** İrsaliye Numarası */
	despatchNo?: string | null;
	/** İrsaliye Tarihi */
	despatchDate?: string;
}

/**
 * Fatura Detail List Result Model
 */
export interface InvoiceDetailResultModel {
	/** Satır kaydı için benzersiz kimlik numarası. */
	id: number;
	/** İlgili faturanın kimliği (üst kayıtla ilişkilendirme). */
	invoiceId?: number;
	/** Satır sıra numarası (1, 2, 3...). */
	lineNumber?: number | null;
	/** Satırda kullanılan kart tipinin açıklaması (stok, hizmet, masraf vb.). */
	detailCardTypeEnumText?: string | null;
	/** Ürün/hizmet kart kodu. */
	cardCode?: string | null;
	/** Ürün veya hizmetin adı. */
	cardName?: string | null;
	/** Lot kart kodu. */
	productLotCode?: string | null;
	/** Lot adı. */
	productLotName?: string | null;
	/** Manuel girilen satır adı (karttan bağımsız yazılmış olabilir). */
	manuelName?: string | null;
	/** Ölçü birimi kodu (örn. ADET, KG, M). */
	unitCode?: string | null;
	/** Miktar. */
	qty?: number;
	/** Birim fiyat (belge para birimi). */
	unitPrice?: number;
	/** Tutar (miktar × birim fiyat) (TRY) */
	amt?: number;
	/** Ürünün takip birimi üzerinden miktar karşılığıdır. */
	qtyPrm?: number;
	/** Birim fiyatın (Belge Para Birimi) */
	unitPriceTra?: number;
	/** Tutar (miktar × birim fiyat) (Belge Para Birimi) */
	amtTra?: number;
	/** Uygulanan indirim oranı (%). */
	disc1Rate?: number;
	/** İndirim tutarı (TRY) */
	disc1Amt?: number;
	/** İndirim tutarı (Belge Para Birimi) */
	disc1AmtTra?: number;
	/** Hesaplanan KDV tutarı (TRY) */
	amtVat?: number;
	/** KDV tutarı (Belge Para Birimi) */
	amtVatTra?: number;
	/** KDV oranı (%). */
	vatRate?: number;
	/** KDV statüsü (ör. dahil, hariç). */
	vatStatus?: number | null;
	/** Net birim fiyat (indirim ve vergi hariç) (TRY). */
	netUnitPrice?: number;
	/** Net birim fiyat (indirim ve vergi hariç) (Belge Para Birimi). */
	netUnitPriceTra?: number;
	/** Satırın net tutarı (vergi ve indirim hariç) (TRY) */
	netAmt?: number;
	/** Net tutar, işlem/döviz para birimi karşılığı (Belge Para Birimi) */
	netAmtTra?: number;
	/** Satırla ilgili ek açıklama 1. */
	note1?: string | null;
	/** Satırla ilgili ek açıklama 2. */
	note2?: string | null;
	/** Müşteri / Tedarikçi ürün kodu */
	accountItemCode?: string | null;
	/** Müşteri / Tedarikçi ürün adı */
	accountItemName?: string | null;
	/** Üretici kodu, */
	producerCode?: string | null;
	/** Ürün markası. */
	brandName?: string | null;
	/** Ürün seri numarası (varsa). */
	serialNumber?: string | null;
	/** Tevkifat tutarı (TRY) */
	withholdingTaxAmt?: number;
	/** Tevkifat tutarı (Belge Para Birimi) */
	withholdingTaxAmtTra?: number;
	/** Tevkifat oranı */
	withholdingPercentage?: number;
	/** Tevkifat türü kodu */
	withholdingTaxTypeCode?: string | null;
	/** Tevkifat türü adı */
	withholdingTaxTypeName?: string | null;
	/** Vergi istisna neden kodu. */
	taxExemptionReasonCode?: string | null;
	/** Vergi istisna neden açıklaması. */
	taxExemptionReasonName?: string | null;
	/** Teslim şekli (INCOTERM kodu, örn. FOB, CIF). */
	deliveryTermCode?: string | null;
	/** Ambalaj markası. */
	packagingBrandName?: string | null;
	/** Paket veya koli numarası. */
	packageNo?: string | null;
	/** Taşıma modu kodu. */
	transportModeCode?: string | null;
	/** Paket adedi. */
	packageQty?: number | null;
	/** GTİP (Gümrük Tarife İstatistik Pozisyonu) kodu. */
	gtipCode?: string | null;
	/** Net ağırlık. */
	netWeight?: number;
	/** Brüt ağırlık. */
	crossWeight?: number;
	/** Menşe ülke adı. */
	originCountryName?: string | null;
	/** Teslimat ülke adı. */
	deliveryCountryName?: string | null;
	/** Teslimat şehir adı. */
	deliveryCityName?: string | null;
	/** Teslimat ilçe/mahalle adı. */
	deliveryCitySubdivisionName?: string | null;
	/** Teslimat bina adı. */
	deliveryBuildingName?: string | null;
	/** Teslimat posta kodu. */
	deliveryPostalCode?: string | null;
	/** Teslimat cadde/sokak adı. */
	deliveryStreetName?: string | null;
	/** Teslimat bina numarası. */
	deliveryBuildingNumber?: string | null;
	/** Ambalaj tipi (kutu, koli, palet vb.). */
	packagingTypeName?: string | null;
	/** HKS (Hal Kayıt Sistemi) etiket numarası. */
	hksTagNumber?: string | null;
	/** HKS kayıtlı mal sahibinin adı soyadı. */
	hksOwnerFullName?: string | null;
	/** HKS mal sahibi kimlik/VKN numarası. */
	hksOwnerIdentifier?: string | null;
	/** Kargo takip numarası. */
	cargoNumber?: string | null;
	/** KDV dahil birim fiyat (TRY) */
	unitPriceWithVat?: number;
	/** KDV dahil birim fiyat (Belge Para Birimi) */
	unitPriceTraWithVat?: number;
	/** Tevkifat tutarı manuel mi girildi? (true/false). */
	isManuelWithholdingTaxAmtTra?: boolean;
	/** İlgili sipariş satırı kimliği (ilişkilendirme). */
	orderDetailId?: number | null;
	/** İlgili sevk irsaliyesi satırı kimliği. */
	despatchDetailId?: number | null;
	/** Teslimat ülke kodu (ISO). */
	deliveryCountryCode?: string | null;
	/** Menşe ülke kodu (ISO). */
	originCountryCode?: string | null;
	/** Fiyat listesi kodu. */
	priceListCode?: string | null;
	/** Fiyat listesi adı. */
	priceListName?: string | null;
	/** Ürün tıbbi/ilaç türü bilgisi (e-reçete senaryolarında). */
	drugAndMedicalType?: number | null;
	/** Cihaz tipi (İlaç / Tıbbi Cihaz). */
	deviceType?: number | null;
	/** Satıcının kendi satır kodu. */
	sellerLineCode?: string | null;
	/** Ürün modeli. */
	modelName?: string | null;
	/** Fatura Vergi modelidir */
	invoiceTax?: InvoiceTaxResultModel[] | null;
	/** Fatura İskonto modelidir */
	invoiceAllowanceCharge?: InvoiceAllowanceChargeResultModel[] | null;
}

/**
 * UblXml göndermeye yarayan taslak Fatura sınıfı
 */
export interface InvoiceDraftForUblXmlModel {
	/** Fatura Id */
	id?: number;
	/** Faturanın ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. 
 İnternet satış ile ilgili ek alanlar, AdditionalDocumentReference alanına eklenmelidir. İlk önce AdditionalDocumentReference'ın DocumentType alanına 'IsInternetSales' ifadesi eklenmelidir. 
 Değer olarak DocumentDescription alanına 'true' ifadesi eklenirse, bu bir internet satışıdır, 'false' ifadesi eklenirse değildir anlamına gelir.
 Sonrasında, diğer alanlar buradaki gibi eklenir. Bu alanların hepsi DocumentType alanına eklenmelidir. Tarih olanların değerleri IssueDate alanına yazılır.
 Text olan alanların değerleri DocumentDescription alanına yazılır. Kulanılan alan listesi : paymentDate(Ödeme tarihi), shippingDate(Gönderim tarihi), shippingAccountVknTckn(Gönderici vkn-tckn), shippingAccountName(Gönderici unvan), internetAccountName (Ödeme aracısı adı), webSiteUrl (Web adresi), paymentType (Ödeme tipi).
 paymentType alanına değer olarak şu ifadeler yazılabilir sadece : 'KREDIKARTI/BANKAKARTI', 'EFT/HAVALE', 'ODEMEARACISI','KAPIDAODEME','DIGER' */
	invoiceTypeUblString?: string | null;
	/** Fatura irsaliye yerine geçiyor mu bilgisini içermektedir. boolean (0,1) Default=False */
	isReplacesEDespatch?: boolean;
	/** Belge Tipi alanıdır. string(Enum)("EFATURA","EARSIVFATURA","ESMM","EMM", "EARSIVFATURA(GIB)") */
	eDocumentType?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** E-Arşiv fatura için kullanılan gönderim tipi bilgisidir. string(enum) ("ELEKTRONIK", "KAGIT") */
	senderType?: string | null;
	/** Müşteri posta kutusu bilgisidir.Eğer alan boş bırakılır ve gönderilen belge E-fatura ise, posta kutusu otomatik atanır. */
	pkAlias?: string | null;
	/** Yeni bir müşteri kartı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewAccount?: boolean;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * Taslak Fatura model
 */
export interface InvoiceDraftModel {
	/** Fatura Id değeri */
	id: number;
	/** Fatura ETTN. Eğer boş gönderilirse sistem tarafında üretilir. */
	invoiceETTN?: string | null;
	/** Belge Tipi alanıdır. string(Enum) ("EFATURA", "EARSIVFATURA", "ESMM", "EMM", "EARSIVFATURA(GIB)", "FATURA") */
	eDocumentType?: string | null;
	/** Belge tipi değişikliklerinde hata fırlatılması isteniyorsa bu parametreye true geçilmelidir. */
	isThrowExceptionOnEDocumentTypeChange?: boolean | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Fatura senaryo bilgisidir. String (Enum) ("TEMEL FATURA", "TİCARİ FATURA", "EARSIVFATURA", "EARSIVBELGE", "ENERJİ", "İLAÇ VE TIBBİ CİHAZ") */
	profile: string;
	/** Fatura tipi bilgisidir. String (Enum) ("SATIŞ", "İADE", "TEVKİFAT", "İSTİSNA", "ÖZEL MATRAH", "İHRAÇ KAYITLI", "KONAKLAMA VERGİSİ", "SARJ", "SARJANLIK") */
	invoiceType: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Ön ek bilgisidir. */
	prefix: string;
	/** Özel oluşturulmuş fatura görünümünüz var ise, bu fatura görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** Fatura tarihi bilgisidir. */
	docDate: string;
	/** Fatura zamanı bilgisidir. */
	docTime: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Döviz tipi bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir. decimal precision : number(18,6) */
	currencyRate: number;
	/** Gönderim tipi bilgisidir. String (Enum) ("ELEKTRONIK", "KAGIT") */
	senderType?: string | null;
	/** Sipariş numarası bilgisidir. */
	orderNo?: string | null;
	/** Sipariş tarihi bilgisidir. */
	orderDate?: string;
	/** İade fatura no bilgisidir.(invoiceType ="İADE "olmalıdır.) */
	billingRefInvoiceNo?: string | null;
	/** İade fatura tarihi bilgisidir.(invoiceType ="İADE "olmalıdır.) */
	billingRefInvoiceDate?: string;
	/** İade fatura açıklama bilgisidir.(invoiceType ="İADE "olmalıdır.) */
	billingRefNote?: string | null;
	/** Faturanın üzerine yazılacak kategori bilgisidir. Bu alana yazılan isimde bir kategori tanımı portalda açılmış olmalıdır. Tanımsız kategori girilirsesistem hata fırlatır. */
	categoryName?: string | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	paymentAccount?: AccountModel;
	/** Ödeme Bilgileri */
	paymentMeans?: PaymentMeansForDraft[] | null;
	/** Fatura irsaliye yerine geçiyor mu bilgisini içermektedir. boolean (0,1) Default=False */
	isReplacesEDespatch?: boolean;
	/** Müşteri posta kutusu bilgisidir.Eğer alan boş bırakılır ve gönderilen belge E-fatura ise, posta kutusu otomatik atanır. */
	pkAlias?: string | null;
	/** Yeni bir müşteri kartı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewAccount?: boolean;
	/** Yeni bir muhasebe hesabı açılıp açılmayacağı bilgisini verir. boolean (0,1) Default=False */
	isNewAcc?: boolean;
	warehouse?: WarehouseInvoiceApiModel;
	invoiceAccount?: AccountModel;
	/** İnternet satışı mı? boolean (0,1) Default=False */
	isInternetSales?: boolean;
	internetShipmentInfo?: InternetShipmentInfoModel;
	/** Fatura içerisindeki mail veya hizmet bilgileri alanıdır. Bir veya birden fazla kalem olacak şekilde girilebilir. */
	invoiceDetail?: InvoiceDetailModel[] | null;
	/** Fatura not bilgisidir.Liste içerisinde birden fazla not eklemesi yapılabilir. */
	notes?: NoteModel[] | null;
	/** Fatura dönem başlangıç tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-01 */
	periodStartDate?: string | null;
	/** Fatura dönem başlangıç saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 08:00:00 */
	periodStartTime?: string | null;
	/** Fatura dönem bitiş tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-30 */
	periodEndDate?: string | null;
	/** Fatura dönem bitiş saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 18:00:00 */
	periodEndTime?: string | null;
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. PLAKA için Örn: 34ABC12345 YABANCIPLAKA için Örn: ABC123 */
	licencePlate?: string | null;
	/** Araç numarası */
	vehicleNumber?: string | null;
	esuReportInfo?: ESUReportInfo;
	/** Belgeye otomatik numara verilmesini sağlar. Eğer bu alan true verilirse, belgeye sistem tarafından otomatik numara verilir. */
	isGenerateDocNo?: boolean | null;
}

/**
 * Kontör Yükleme Bilgilerini tutar
 */
export interface InvoiceDrugAndMedicalModel {
	/** Faturanın benzersiz ETTN değeridir. */
	invoiceETTN: string;
	/** İlgili faturanın kimliği */
	invoiceId: number;
	/** Faturaya ait detay kimliği. */
	invoiceDetailId: number;
	/** Tip alanıdır İLAÇ = 1, TIBBİ CİHAZ  = 2 girilmedir. */
	drugAndMedicalType: number;
	/** DrugAndMedicalType  = 'İlaç"  olması durumunda (Küresel Ticari Ürün Numarası) , DrugAndMedicalType  = 'Tıbbi Cihaz" olması durumunda (Ürün Numarası) yazılacaktır */
	productNumber: string;
	/** Parti/Lot numarası yazılacaktır */
	batchNumber: string;
	/** Seri/Sıra numarası yazılacaktır */
	serialNumber: string;
	/** DrugAndMedicalType  = 'İlaç" olması durumunda (Son Kullanma Tarihi) , DrugAndMedicalType  = 'Tıbbi Cihaz" olması durumunda (Üretim Tarihi) yazılacaktır.(Format YYYY-MM-DD şeklinde olacaktır.) */
	baseDate: string;
}

/**
 * Çoklu İlaç ve Tıbbi cihaz gönderim modeli
 */
export interface InvoiceDrugAndMedicalRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber?: string | null;
	/** Tıbbi Cihaz Model Listesi */
	invoiceDrugAndMedicalList: InvoiceDrugAndMedicalModel[];
}

/**
 * Kur bilgisi
 */
export interface InvoiceForApiCurrencyRateInfoModel {
	/** Vergi kur bilgisi */
	taxExchangeRate?: number;
	/** Fiyatlama kur bilgisi */
	pricingExchangeRate?: number;
	/** Ödeme kur bilgisi */
	paymentExchangeRate?: number;
	/** Alternatif ödeme kur bilgisi */
	paymentAlternativeExchangeRate?: number;
}

/**
 * Fatura hesap bilgisi
 */
export interface InvoiceForApiCustomerInfoModel {
	/** VKN/TCKN bilgisi */
	identifierNumber?: string | null;
	/** Unvan */
	partyName?: string | null;
	/** Hesap Adı */
	customerName?: string | null;
	/** Hesap Soyadı */
	customerSurname?: string | null;
	/** Ülke adı */
	countryName?: string | null;
	/** Şehir adı */
	cityName?: string | null;
	/** İlçe adı */
	citySubdivisionName?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Bina Adı */
	buildingName?: string | null;
	/** Bina numarası */
	buildingNumber?: string | null;
	/** Blok adı */
	blockName?: string | null;
	/** Daire numarası */
	room?: string | null;
	/** Posta kutusu */
	postbox?: string | null;
	/** MERSİS Numarası */
	mersisNo?: string | null;
	/** Email */
	email?: string | null;
	/** Telefon */
	telephone?: string | null;
	/** Vergi dairesi adı */
	taxOfficeName?: string | null;
}

/**
 * Gelen fatura detay bilgisi
 */
export interface InvoiceForApiDetailModel {
	/** Satır no */
	lineNo?: number;
	/** Miktar */
	invoicedQuantity?: number;
	/** Birim Kodu */
	unitCode?: string | null;
	/** Toplam Tutar */
	lineExtensionAmount?: number;
	taxTotal?: InvoiceForApiTaxTotalModel;
	/** Tevkifat Bilgisi */
	witholdingTaxTotal?: InvoiceForApiTaxTotalModel[] | null;
	detailItem?: InvoiceForApiItemModel;
	/** İskonto Bilgisi */
	allowanceChargeList?: AllowanceCharge[] | null;
	/** Birim Fiyat */
	unitPrice?: number;
}

/**
 * Gelen fatura stok bilgisi
 */
export interface InvoiceForApiItemModel {
	/** Stok Adı */
	itemName?: string | null;
	/** Stok Açıklaması */
	itemDescription?: string | null;
	/** Satıcı Kodu */
	sellersItemIdentificationId?: string | null;
	/** Alıcı Kodu */
	buyersItemIdentificationId?: string | null;
	/** Üretici Kodu */
	manufacturersItemIdentificationId?: string | null;
	/** Seri No */
	serialId?: string | null;
}

/**
 * Genel toplam bilgileri
 */
export interface InvoiceForApiLegalMonetaryTotalModel {
	/** Satır toplam tutarı */
	lineExtensionAmount?: number;
	/** Vergiler hariç tutar */
	taxExclusiveAmount?: number;
	/** Vergiler dahil tutar */
	taxInclusiveAmount?: number;
	/** Yuvarlama tutarı */
	payableRoundingAmount?: number;
	/** Ödenecek tutar */
	payableAmount?: number;
	/** İskonto tutarı */
	allowanceTotalAmount?: number;
}

/**
 * Fatura modeli
 */
export interface InvoiceForApiModel {
	/** Fatura profile Id */
	profileId?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Fatura tarihi */
	docDate?: string | null;
	/** Fatura zamanı */
	docTime?: string | null;
	/** Vade Tarihi */
	dueDate?: string | null;
	/** Fatura tipi */
	invoiceTypeCode?: string | null;
	/** Fatura notları */
	noteList?: string[] | null;
	/** Belge para birimi */
	documentCurrencyCode?: string | null;
	customerInfo?: InvoiceForApiCustomerInfoModel;
	supplierInfo?: InvoiceForApiCustomerInfoModel;
	currencyRateInfo?: InvoiceForApiCurrencyRateInfoModel;
	/** Vergi bilgileri */
	taxTotal?: InvoiceForApiTaxTotalModel[] | null;
	/** Tevkifat bilgileri */
	witholdingTaxTotal?: InvoiceForApiTaxTotalModel[] | null;
	legalMonetaryTotal?: InvoiceForApiLegalMonetaryTotalModel;
	/** Fatura detayları */
	detailList?: InvoiceForApiDetailModel[] | null;
}

export interface InvoiceForApiModelResultModel {
	data?: InvoiceForApiModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Vergi detay bilgisi
 */
export interface InvoiceForApiTaxSubtotalModel {
	/** Vergi matrah tutarı */
	taxableAmount?: number;
	/** Vergi tutarı */
	taxAmount?: number;
	/** Vergi oranı */
	percent?: number;
	/** Vergi adı */
	taxName?: string | null;
	/** Vergi kodu */
	taxTypeCode?: string | null;
	/** Vergi istisna */
	taxExcemptionReason?: string | null;
	/** Vergi istisna kodu */
	taxExcemptionReasonCode?: string | null;
}

/**
 * Fatura vergi bilgisi
 */
export interface InvoiceForApiTaxTotalModel {
	/** Toplam vergi tutarı */
	taxAmount?: number;
	/** Vergi detay bilgisi */
	taxSubtotalList?: InvoiceForApiTaxSubtotalModel[] | null;
}

/**
 * Faturanın ön izlemesini gösterecek sınıf
 */
export interface InvoiceForUblXmlDraftModel {
	/** Faturanın ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. 
 İnternet satış ile ilgili ek alanlar, AdditionalDocumentReference alanına eklenmelidir. İlk önce AdditionalDocumentReference'ın DocumentType alanına 'IsInternetSales' ifadesi eklenmelidir. 
 Değer olarak DocumentDescription alanına 'true' ifadesi eklenirse, bu bir internet satışıdır, 'false' ifadesi eklenirse değildir anlamına gelir.
 Sonrasında, diğer alanlar buradaki gibi eklenir. Bu alanların hepsi DocumentType alanına eklenmelidir. Tarih olanların değerleri IssueDate alanına yazılır.
 Text olan alanların değerleri DocumentDescription alanına yazılır. Kulanılan alan listesi : paymentDate(Ödeme tarihi), shippingDate(Gönderim tarihi), shippingAccountVknTckn(Gönderici vkn-tckn), shippingAccountName(Gönderici unvan), internetAccountName (Ödeme aracısı adı), webSiteUrl (Web adresi), paymentType (Ödeme tipi).
 paymentType alanına değer olarak şu ifadeler yazılabilir sadece : 'KREDIKARTI/BANKAKARTI', 'EFT/HAVALE', 'ODEMEARACISI','KAPIDAODEME','DIGER' */
	invoiceTypeUblString?: string | null;
	/** Belge Tipi alanıdır. string(Enum) ("EFATURA", "EARSIVFATURA", "ESMM", "EMM") */
	eDocumentType?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Taslak belge gösteriminde eğer görüntü üzerinde TASLAK ifadesi yazılması isteniyorsa bu parametre true olarak geçilir. */
	isPrintDraftWatermark?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * UblXml göndermeye yarayan Fatura sınıfı
 */
export interface InvoiceForUblXmlModel {
	/** Faturanın ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. 
 İnternet satış ile ilgili ek alanlar, AdditionalDocumentReference alanına eklenmelidir. İlk önce AdditionalDocumentReference'ın DocumentType alanına 'IsInternetSales' ifadesi eklenmelidir. 
 Değer olarak DocumentDescription alanına 'true' ifadesi eklenirse, bu bir internet satışıdır, 'false' ifadesi eklenirse değildir anlamına gelir.
 Sonrasında, diğer alanlar buradaki gibi eklenir. Bu alanların hepsi DocumentType alanına eklenmelidir. Tarih olanların değerleri IssueDate alanına yazılır.
 Text olan alanların değerleri DocumentDescription alanına yazılır. Kulanılan alan listesi : paymentDate(Ödeme tarihi), shippingDate(Gönderim tarihi), shippingAccountVknTckn(Gönderici vkn-tckn), shippingAccountName(Gönderici unvan), internetAccountName (Ödeme aracısı adı), webSiteUrl (Web adresi), paymentType (Ödeme tipi).
 paymentType alanına değer olarak şu ifadeler yazılabilir sadece : 'KREDIKARTI/BANKAKARTI', 'EFT/HAVALE', 'ODEMEARACISI','KAPIDAODEME','DIGER' */
	invoiceTypeUblString?: string | null;
	/** Belge Tipi alanıdır. string(Enum) ("EFATURA", "EARSIVFATURA", "ESMM", "EMM") */
	eDocumentType?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Posta Kutusu alanıdır */
	pkAlias?: string | null;
	/** Gönderici Birim alanıdır */
	gbAlias?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Eğer belge gönderim sırasında, belgenin tipinin değiştiği tesbit edilirse hata fırlatılıp fırlatılmayacağını belirleyen alan.
 Örneğin belge eğer EFATURA olarak gönderildiyse, ancak ilgili vknye earşiv fatura kesilmesi gerekiyorsa, sistem belge tipini otomatik değiştiriyor. 
 bu durumda sürecin ilerlemeyip hata verilmesi isteniyorsa bu parametre true gönderilmelidir. */
	isThrowExceptionOnEDocumentTypeChange?: boolean | null;
	/** Taslak olarak kaydet. bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
}

/**
 * Tepe Bilişime özel yapılan fatura modeli
 */
export interface InvoiceForUblXmlTepeBilisimModel {
	/** Faturanın Tepe Bilişime özel yapıdaki XML halidir. */
	xml?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Alıcı firmanın posta kutusu, alias bilgisidir.Birden fazla alıcı posta kutusu olan bir firmaya fatura gönderecekseniz, tercih ettiğiniz
 alias bilgisini girebilirsiniz boş bırakılması durumunda sistem tarafından ilk gerçerili bulduğu posta kutusunu otomatik atanır.E-Arşiv faturalarda bu alan boş bırakılmalıdır. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,boş bırakılması durumunda
 firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
}

/**
 * SoftNet Excel Fatura Transfer Metodu
 */
export interface InvoiceFromSoftNetExcelRequestModel {
	/** İlgili faturaları içeren excel dosyasının ziplenip base64 stringe çevrilmiş halidir */
	excelZipBase64String?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * SoftNet Excel Fatura Transfer Sonuç Sınıfı
 */
export interface InvoiceFromSoftNetExcelResponseModel {
	/** Yüklenen Excel dosyası için tutulan referans değeri */
	transferGuid?: string | null;
}

export interface InvoiceFromSoftNetExcelResponseModelResultModel {
	data?: InvoiceFromSoftNetExcelResponseModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Faturanın başlık bilgilerini tutan sınıf
 */
export interface InvoiceHeaderInfoModel {
	/** Fatura Id alanıdır */
	id?: number;
	/** Fatura senaryosu bilgisidir. */
	profile?: string | null;
	/** Fatura durum bilgisi */
	invoiceStatusText?: string | null;
	/** "Fatura tipi bilgisidir. */
	invoiceType?: string | null;
	/** Faturanın evrensel tekil tanımlama numarasıdır. */
	ettn?: string | null;
	/** Fatura numarası bilgisidir. */
	docNo?: string | null;
	/** Fatura Tarihi alanıdır */
	docDate?: string;
	/** Posta kutusu bilgisidir */
	pkAlias?: string | null;
	/** Gönderici birim bilgisidir. */
	gbAlias?: string | null;
	/** VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Mal/hizmet miktarı ile Mal/hizmet birim fiyatının çarpımı ile bulunan tutarlar toplamıdır. */
	lineExtensionAmount?: number;
	/** Vergiler hariç, ıskonto veya artırım dahil toplam tutarıdır. */
	taxExclusiveAmount?: number;
	/** Vergiler, ıskonto ve artırım dahil toplam tutarıdır. */
	taxInclusiveAmount?: number;
	/** Yuvarlama tutarıdır. */
	payableRoundingAmount?: number;
	/** Ödenecek tutardır. */
	payableAmount?: number;
	/** Toplam iskonto tutarı */
	allowanceTotalAmount?: number;
	/** Toplam vergi tutarı */
	taxTotalTra?: number;
	/** Toplam %0 Kdv */
	vatTotalTra0?: number;
	/** Toplam %1 kdv tutarı */
	vatTotalTra1?: number;
	/** Toplam %8 kdv tutarı */
	vatTotalTra8?: number;
	/** Toplam %18 kdv tutarı */
	vatTotalTra18?: number;
	/** Toplam %10 kdv tutarı */
	vatTotalTra10?: number;
	/** Toplam %20 kdv tutarı */
	vatTotalTra20?: number;
	/** %0 KDV Matrahı */
	taxableVatTotalTra0?: number;
	/** %1 KDV Matrahı */
	taxableVatTotalTra1?: number;
	/** %8 KDV Matrahı */
	taxableVatTotalTra8?: number;
	/** %18 KDV matrahı */
	taxableVatTotalTra18?: number;
	/** %10 KDV Matrahı */
	taxableVatTotalTra10?: number;
	/** %20 KDV Matrahı */
	taxableVatTotalTra20?: number;
	/** Para birimi */
	currencyCode?: string | null;
	/** Kur bilgisi */
	currencyRate?: number;
	/** Belgenin sistemde oluşturulma zamanı */
	createDate?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Yazdırma Sayısı */
	printCount?: number | null;
	/** Arşivlenmişmi? */
	isArchived?: boolean;
	/** Zarf durum kodu */
	envelopeStatusCode?: string | null;
	/** Zarf durum açıklaması */
	envelopeStatusDesc?: string | null;
	/** Rapor durum kodu */
	archiveReportStatusCode?: string | null;
	/** Rapor durum açıklaması */
	archiveReportStatusDesc?: string | null;
}

export interface InvoiceHeaderInfoModelListPagingResultModel {
	data?: InvoiceHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	totalCount?: number;
}

export interface InvoiceHeaderInfoModelListResultModel {
	data?: InvoiceHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gelen faturanın zarf bilgilerini tutan sınıf
 */
export interface InvoiceInboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** Fatura UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	invoiceTypeStrAsZip?: string | null;
}

export interface InvoiceInboxEnvelopeInfoResponseResultModel {
	data?: InvoiceInboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gelen faturanın durumunu belirten sınıftır.
 */
export interface InvoiceInboxStatusResultModel {
	/** Giden Fatura Id */
	id?: number;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Fatura Numarası */
	docNo?: string | null;
	/** Fatura Durumları (BOS,IPTAL_EDILDI,TASLAK,ARSIV_KAYIT_KUYRUGUNDA,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,KABUL_KUYRUGUNDA,RED_KUYRUGUNDA,YANIT_BEKLENIYOR,KABUL,RED,HATA,ONAYLANDI(e-Arşiv faturalar için)) */
	invoiceStatusText?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
	/** Döküman Tipi (EFATURA(1),EARSIVFATURA(2)) */
	eDocumentType?: number;
}

export interface InvoiceInboxStatusResultModelResultModel {
	data?: InvoiceInboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Fatura kalemleri sorgu model
 */
export interface InvoiceItemsRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Fatura tarihi başlangıç alanıdır. */
	docDateS?: string | null;
	/** Fatura tarihi bitiş alanıdır. */
	docDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Stok kodu başlangıç alanıdır. */
	productCodeS?: string | null;
	/** Stok kodu bitiş alanıdır. */
	productCodeE?: string | null;
	/** Gelir kodu başlangıç alanıdır. */
	gainCodeS?: string | null;
	/** Gelir kodu bitiş alanıdır. */
	gainCodeE?: string | null;
	/** Gider kodu başlangıç alanıdır. */
	lostCodeS?: string | null;
	/** Gider kodu bitiş alanıdır. */
	lostCodeE?: string | null;
	/** Hareket Tipi alanıdır. Integer(Enum) (Satış=1 - Alış=2 - Hepsi=5) */
	purchaseSales?: number | null;
}

/**
 * Fatura kalemleri sorgu sonuç model
 */
export interface InvoiceItemsResultModel {
	/** Fatura detay tablosunun tekil alanıdır. */
	invoiceDetailId?: number;
	/** Fatura tablosunun tekil alanıdır. */
	invoiceId?: number;
	/** Fatura numarası bilgisidir. */
	docNo?: string | null;
	/** Fatura tarihi bilgisidir. */
	docDate?: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string | null;
	/** Cari tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Fatura tipi bilgisidir. */
	transactionTypeName?: string | null;
	/** E-Fatura/E-Arşiv Fatura senaryo bilgisidir. */
	profileEnumText?: string | null;
	/** E-Fatura/E-Arşiv Fatura tipi bilgisidir. */
	einvoiceTypeEnumText?: string | null;
	/** Para birimi kodu bilgisidir. */
	currencyCode?: string | null;
	/** Kur oranı bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Stok/Hizmet kartı tekil alanıdır. */
	productId?: number;
	/** Stok tipi bilgisidir. */
	productType?: string | null;
	/** Stok/Gelir/Gider kodu bilgisidir. */
	cardCode?: string | null;
	/** Stok/Gelir/Gider adı bilgisidir. */
	cardName?: string | null;
	/** Fatura girilen Stok/Gelir/Gider adı bilgisidir. */
	manuelName?: string | null;
	/** Birim adı bilgisidir. */
	unitCode?: string | null;
	/** Hareket miktarı bilgisidir. decimal precision : number(18,6) */
	qtyPrm?: number;
	/** Birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPrice?: number;
	/** Birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Tutar bilgisidir. decimal precision : number(18,2) */
	amtTra?: number;
	/** Net tutar bilgisidir. decimal precision : number(18,2) */
	netAmt?: number;
	/** Net tutar bilgisidir. decimal precision : number(18,2) */
	netAmtTra?: number;
	/** KDV oranı bilgisidir. decimal precision : number(18,2) */
	kdvTaxPercentage?: number;
	/** KDV tutarı bilgisidir. decimal precision : number(18,2) */
	kdvTaxAmt?: number;
	/** KDV tutarı bilgisidir. decimal precision : number(18,2) */
	kdvTaxAmtTra?: number;
	/** Diğer vergiler tutar bilgisidir. decimal precision : number(18,2) */
	otherTaxAmt?: number;
	/** Diğer vergiler tutar bilgisidir. decimal precision : number(18,2) */
	otherTaxAmtTra?: number;
	/** İskonto tutar bilgisidir. decimal precision : number(18,2) */
	allowanceAmt?: number;
	/** İskonto tutar bilgisidir. decimal precision : number(18,2) */
	allowanceAmtTra?: number;
}

export interface InvoiceItemsResultModelQueryResultList {
	data?: InvoiceItemsResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Fatura liste sorgu model
 */
export interface InvoiceListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Fatura başlangıç tarihi alanıdır. */
	docDateS?: string | null;
	/** Fatura bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Belge sınıfı adı (Kategori,Proje vs.).Birden fazla değer geçilebilir. */
	categoryName?: string | null;
	/** Fatura tipi.Birden fazla değer geçilebilir. */
	transactionType?: string | null;
	/** Satış=1 ; Alış=2; Birden fazla değer geçilebilir. */
	purchaseSales?: string | null;
}

/**
 * Fatura liste sorgu sonuç model
 */
export interface InvoiceListResultModel {
	/** Fatura tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** E-fatura tipinin ad bilgisidir. */
	einvoiceTypeEnumText?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** Fatura numarası bilgisidir. */
	docNo?: string | null;
	/** Fatura tarihi bilgisidir. */
	docDate?: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Depo kodu bilgisidir. */
	warehouseCode?: string | null;
	/** Depo adı bilgisidir. */
	warehouseName?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Kur bilgisidir. decimal precision : number(18,6) */
	currencyRate?: number;
	/** Firma para birimi cinsinden toplam tutar bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	lineExtensionAmt?: number;
	/** Fatura para birimi cinsinden toplam tutar bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	lineExtensionAmtTra?: number;
	/** Firma para birimi cinsinden toplam iskonto tutarı bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	allowanceTotalAmt?: number;
	/** Fatura para birimi cinsinden toplam iskonto tutarı bilgisidir. (Vergiler Hariç) decimal precision : number(18,2) */
	allowanceTotalAmtTra?: number;
	/** Firma para birimi cinsinden vergiler toplamı bilgisidir. decimal precision : number(18,2) */
	taxAmt?: number;
	/** Fatura para birimi cinsinden vergiler toplamı bilgisidir. decimal precision : number(18,2) */
	taxAmtTra?: number;
	/** Firma para birimi cinsinden tevkifat toplamı bilgisidir. decimal precision : number(18,2) */
	witholdingTaxAmt?: number;
	/** Fatura para birimi cinsinden tevkifat toplamı bilgisidir. decimal precision : number(18,2) */
	witholdingTaxAmtTra?: number;
	/** Firma para birimi cinsinden ödenecek tutar bilgisidir. decimal precision : number(18,2) */
	payableAmt?: number;
	/** Fatura para birimi cinsinden ödenecek tutar bilgisidir. decimal precision : number(18,2) */
	payableAmtTra?: number;
}

export interface InvoiceListResultModelQueryResultList {
	data?: InvoiceListResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Fatura Not Modeli
 */
export interface InvoiceNoteForApiModel {
	/** Faturanın benzersiz ETTN değeridir. */
	invoiceETTN: string;
	/** Faturaya eklenecek not bilgisi. */
	note: string;
}

/**
 * Fatura liste sorgu model
 */
export interface InvoiceNoteRequestModel {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber?: string | null;
	/** Fatura Not Model Listesi */
	invoiceNoteList: InvoiceNoteForApiModel[];
}

/**
 * Fatura Detail Note List Result Model
 */
export interface InvoiceNoteResultModel {
	/** Fatura açıklamalarını benzersiz tekil numarasıdır. */
	id: number;
	/** İlgili faturanın kimliği (üst kayıt). */
	invoiceId: number;
	/** Açıklama */
	note?: string | null;
}

/**
 * Faturaya ait alıcı bilgilerinin bulunduğu alandır.
 */
export interface InvoiceOutboxAccountModel {
	/** Alıcı VKN/TCKN bilgisidir. */
	vknTckn?: string | null;
	/** Alıcı unvan adı veya ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Alıcı vergi dairesi adı bilgisidir. */
	taxOfficeName?: string | null;
	/** Müşteri-Tedarikçi Ülke Adı alanıdır */
	countryName?: string | null;
	/** Müşteri-Tedarikçi Şehir Adı alanıdır */
	cityName?: string | null;
	/** İç kapı numarası bilgisidir. */
	room?: string | null;
	/** Meydan/bulvar/cadde adı bilgisidir. */
	streetName?: string | null;
	/** Blok Adı alanıdır */
	blockName?: string | null;
	/** Bina Adı alanıdır */
	buildingName?: string | null;
	/** Bina veya bloğa ait dış kapı numarası bilgisidir. */
	buildingNumber?: string | null;
	/** Semt alanıdır */
	citySubdivision?: string | null;
	/** Posta Kodu alanıdır */
	postalCode?: string | null;
	/** Kasaba/köy/mezra/mevkii bilgisidir. */
	region?: string | null;
	/** Mahalle alanıdır */
	district?: string | null;
	/** Telefon alanıdır */
	telephone1?: string | null;
	/** Fax alanıdır */
	fax1?: string | null;
	/** Elektronik posta adresi bilgisidir. */
	email1?: string | null;
	/** Alıcının web sayfası adresi bilgisidir. */
	webSiteUrl?: string | null;
	/** Tedarikçi kodu bilgisidir. */
	supplierCode?: string | null;
	personInfo?: PersonInfoModel;
	vehicleInfo?: VehicleInfoModel;
}

/**
 * Giden Fatura Detay Model
 */
export interface InvoiceOutboxDetailModel {
	/** Satıcı mal veya hizmet kodu bilgisidir. */
	productCode?: string | null;
	/** Stok Adı alanıdır */
	productName?: string | null;
	/** Alıcı mal veya hizmet kodu bilgisidir. */
	buyerProductCode?: string | null;
	/** Üretici mal veya hizmet kodu bilgisidir. */
	manufacturerProductCode?: string | null;
	/** Marka Adı alanıdır */
	brandName?: string | null;
	/** Model Adı alanıdır */
	modelName?: string | null;
	/** Birim kodu bilgisidir. ISO birim kodu yazılmalıdır. Adet için örn: 'C62' gönderilmesi gerekmektedir. */
	unitCode?: string | null;
	/** Para birimi kodu. Detayda farklı para birimleri kullanılacaksa bu alan doldurulabilir. Ancak bu şekildeki kullanımda, masterdaki tax alanı dolu gönderilmelidir. */
	currencyCode?: string | null;
	/** Miktar alanıdır */
	qty?: number;
	/** Birim Fiyat alanıdır */
	unitPriceTra?: number;
	/** Tutar alanıdır */
	amtTra?: number;
	/** KDV Oran alanıdır */
	vatRate?: number;
	/** KDV Tutar alanıdır */
	amtVatTra?: number;
	/** KDV hesaplanacak matrah bilgisidir. Herhangi bir değer gönderilmez ise, amtTra alanı taxableAmtTra olarak alınacaktır. */
	taxableAmtTra?: number;
	/** Fatura kalemi için girmek istediğiniz not bilgisidir. Tek satır açıklama girilecek ise bu alan kullanılabilir. */
	note?: string | null;
	/** Fatura kalemi için girmek istediğiniz notlardır. Birden fazla açıklama girilecek ise bu alan kullanılabilir. */
	noteList?: string[] | null;
	medicineMedicalEquipmentInfo?: MedicineMedicalEquipmentInfo;
	/** GTİP numarası bilgisidir.Standart kod değerleri girilmelidir. */
	gtip?: string | null;
	/** “İhraç Kayıtlı” fatura tipinde, 702 kodlu istisna seçildiğinde girilmesi zorunlu olan Alıcı satır kodudur. */
	lineCode?: string | null;
	/** “İhraç Kayıtlı” fatura tipinde, 702 kodlu istisna seçildiğinde girilmesi zorunlu olan Satıcı satır kodudur. */
	sellerlineCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana kodlu olarak girilecektir.
 invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana serbest metin olarak girilecektir.
 invoiceType="İSTİSNA" olduğunda veya kdv oranı '0' olduğunda zorunlu alandır */
	taxExemptionReasonName?: string | null;
	/** Tevkifat kodu bilgisidir. */
	withholdingTaxTypeCode?: string | null;
	/** Tevkifat adı bilgisidir. */
	withholdingTaxTypeName?: string | null;
	/** Tevkifat oranı bilgisidir.
 (sadece withholdingTaxTypeCode = 650 olduğu durumlarda değer doldurulabilir. */
	withholdingTaxPercentage?: number;
	/** Tevkifatın hesaplandığı tutar (matrah) bilgisidir. */
	withholdingTaxableAmount?: number;
	/** Tevkifat tutar bilgisidir. */
	withholdingTaxAmount?: number;
	/** HKS Künye no */
	hksTagNumber?: string | null;
	/** HKS Mal Sahibi Adı */
	hksOwnerFullName?: string | null;
	/** HKS Mal Sahibi VKN TCKN */
	hksOwnerIdentifier?: string | null;
	/** Detaydaki mal hizmet tutarı yazılırken, satırda yapılan toplam iskonto değeri amtTra alanından çıkartılıp mı yazılacak, çıkartmadan mı yazılacak onu belirlemek için kullanılır. */
	isSubtractDiscountFromAmtTra?: boolean | null;
	/** Ek vergiler bilgileri alanıdır. */
	tax?: InvoiceOutboxDetailTaxModel[] | null;
	/** İskonto/Artırım bilgileri. */
	allowanceCharge?: AllowanceCharge[] | null;
	/** Stok için ek bilgiler */
	additionalItemIdentification?: IdentificationType[] | null;
	/** Stok özellikleri */
	itemInstance?: ItemInstance[] | null;
	/** Harcama Tipi (YATIRIMTESVIK faturaları için)
 01 - Makine ve teçhizat teslimleri ile yazılım ve gayrimaddi hak satış ve kiralamalarına ilişkin faturalar
 02 - İnşaat işlerine ilişkin mal teslimleri ve hizmet ifalarına ait faturalar
 03 - Arsa ve Arazi Satışına ait faturalar
 04 - Diğer harcamalara ilişkin faturalar */
	expenditureType?: string | null;
	shipment?: Shipment;
	technologyAssistanceDeviceInfo?: TechnologyAssistanceDeviceInfo;
}

/**
 * Ek vergiler bilgileri alanıdır.
 */
export interface InvoiceOutboxDetailTaxModel {
	/** Vergi adı bilgisidir. KDV, ÖİV ve ÖTV Tax sınıfı içerisine ayrıca gönderilmeyecektir. */
	taxName?: string | null;
	/** Vergi Kodu alanıdır */
	taxCode?: string | null;
	/** Vergi Oran alanıdır */
	taxRate?: number;
	/** Hesaplanan vergi Tutarıdır. */
	taxAmount?: number;
	/** Verginin üzerinden hesaplandığı tutar (matrah) bilgisi girilecektir. */
	taxableAmount?: number;
	/** Vergi muafiyet, istisna sebepleri bu alana kodlu olarak girilecektir. */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana serbest metin olarak girilecektir. */
	taxExemptionReasonName?: string | null;
}

/**
 * Giden faturanın zarf bilgilerini tutan sınıf
 */
export interface InvoiceOutboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** Fatura UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	invoiceTypeStrAsZip?: string | null;
}

export interface InvoiceOutboxEnvelopeInfoResponseResultModel {
	data?: InvoiceOutboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden Fatura Model
 */
export interface InvoiceOutboxModel {
	/** Hesaplamaların API tarafından yapılıp yapılmayacağını belirtir. Eğer faturanın tüm hesaplamalarının API tarafından yapılması isteniyor ise bu alana true geçilmelidir. (Geliştirme Aşamasında) */
	isCalculateByApi?: boolean;
	/** Fatura Id alanıdır */
	id?: number;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Belge Tipi alanıdır. string(Enum) ("EFATURA", "EARSIVFATURA", "ESMM", "EMM") */
	eDocumentType?: string | null;
	/** Fatura senaryosu bilgisidir. invoiceAccount altında bulunan VknTckn GİB e-fatura mükellef listesinde yer alıyor ise, 'EARSIVFATURA' dışındaki değerlerden biri gönderilmelidir.
 * invoiceAccount altında bulunan VknTckn GİB e-fatura mükellef kontrolü yapılarak bulunabileceği gibi, GİB e-fatura mükellef bilgilerini
 kendi sisteminize alıp kontrolleri sizin tarafından yapılmasınıda sağlayabilirsiniz.
 ("TEMELFATURA", "TICARIFATURA", "YOLCUBERABERFATURA", "IHRACAT", "OZELFATURA", "KAMU", "EARSIVFATURA", "HKS", "EARSIVBELGE", "ENERJI", "ILAC_TIBBICIHAZ", "YATIRIMTESVIK", "IDIS") */
	profile?: string | null;
	/** Fatura tipi bilgisidir.
 * profile değeri 'IHRACAT' ise, fatura tipi 'İSTİSNA' olmalıdır.
 * Fatura tipi 'IADE' ise, profile değeri  'TEMELFATURA', 'EARSIVFATURA', 'ILAC_TIBBICIHAZ', 'YATIRIMTESVIK', 'IDIS' veya 'KAMU' olabilir.
 * Fatura tipi 'TEKNOLOJIDESTEK' ise, profile değeri 'EARSIVFATURA' olmalıdır.
 ("SATIS", "IADE", "TEVKIFAT", "ISTISNA", "OZELMATRAH", "IHRACKAYITLI", "SGK", "KOMISYONCU", "HKSSATIS",
 "HKSKOMISYONCU", "KONAKLAMAVERGISI", "SARJ", "SARJANLIK",
 "TEKNOLOJIDESTEK", "YTBSATIS", "YTBISTISNA", "YTBIADE", "YTBTEVKIFAT", "YTBTEVKIFATIADE") */
	invoiceType?: string | null;
	/** Faturanın evrensel tekil tanımlama numarasıdır.
 Faturayı ilk gönderimde bu alanı boş geçebilirsiniz veya kendiniz bu alanı gönderebilirsiniz. */
	ettn?: string | null;
	/** Fatura numarası ön ek bilgisidir.Örn:MYF
 Sistem tarafından fatura numarası veriyorsa ve sistem üzerinde birden fazla ön ek değeriniz bulunuyor ise,
 bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden
 fatura numarası atanır. */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-fatura,e-arşiv, ve e-arşiv internet satış numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Fatura numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,boş ise varsayılan ön ek değeriniz 
 üzerinden fatura numarası atanır.
 Örnek:MYF2019000001220, 3 hane ön ek, 4 hane yıl bilgisi, 9 fatura numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** Fatura Tarihi alanıdır */
	docDate?: string;
	/** Fatura zamanı bilgisidir. e-Arşiv Faturalarda saat bilgisi koyma zorunluluğunuz bulunuyor. */
	docTime?: string;
	/** Vade Tarihi alanıdır */
	dueDate?: string | null;
	/** Fatura dönem başlangıç tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-01 */
	periodStartDate?: string | null;
	/** Fatura dönem başlangıç saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 08:00:00 */
	periodStartTime?: string | null;
	/** Fatura dönem bitiş tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-30 */
	periodEndDate?: string | null;
	/** Fatura dönem bitiş saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 18:00:00 */
	periodEndTime?: string | null;
	/** Fatura dönem açıklaması */
	periodDescription?: string | null;
	additionalInvoiceInfo?: AdditionalInvoiceInfoModel;
	/** Döviz tipi bilgisidir. */
	currencyCode?: string | null;
	/** Döviz kuru bilgisidir.'TRY' olması durumunda 1 değeri girilmelidir. */
	currencyRate?: number;
	/** E-Arşiv fatura için kullanılan gönderim tipi bilgisidir. string(enum) ("ELEKTRONIK", "KAGIT") */
	senderType?: string | null;
	/** Sipariş No alanıdır */
	orderNo?: string | null;
	/** Sipariş Tarihi alanıdır */
	orderDate?: string;
	/** İrsaliye bilgileri */
	waybillInfo?: WaybillInfo[] | null;
	/** İade fatura no bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceNo?: string | null;
	/** İade fatura tarihi bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceDate?: string;
	/** İade fatura açıklama bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefNote?: string | null;
	/** İade faturası birden fazla ise bu liste kullanılabilir. */
	billingRefInvoiceList?: ReturnInvoiceRefInfo[] | null;
	invesmentIncentiveInfo?: InvesmentIncentiveInfo;
	/** 702 istisna kodu seçildiğinde girilmesi gereken karşı belge numarası */
	counterDocNo?: string | null;
	/** Fatura not bilgisidir.Liste içerisinde birden fazla not eklemesi yapılabilir. */
	notes?: NoteModel[] | null;
	/** Alıcı firmanın posta kutusu, alias bilgisidir.Birden fazla alıcı posta kutusu olan bir firmaya fatura gönderecekseniz, tercih ettiğiniz
 alias bilgisini girebilirsiniz boş bırakılması durumunda sistem tarafından ilk gerçerili bulduğu posta kutusunu otomatik atanır.E-Arşiv faturalarda bu alan boş bırakılmalıdır. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,boş bırakılması durumunda
 firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
	/** İthalat İhracatta kullanılan teslimat şartları bilgisidir. Standart kod değerleri girilmelidir.(CFR,CIF,CIP,CPT,DAF,DDP,DDU,DEQ,DES,EXW,FAS,FCA,FOB,DAP,DAT) */
	deliveryTermCode?: string | null;
	/** Taşıma fazının hangi modda (hava, deniz, kara) gerçekleştiği bilgisidir.Standart kod değerleri girilmelidir.Değerler (0,1,2,3,4,5,6,7,8)
 Açıklama (0 - Boş, 1 - Denizyolu, 2 - Demiryolu, 3 - Karayolu, 4 - Havayolu, 5 - Posta, 6 - Çok Araçlı, 7 - Sabit Taşıma Tesisleri , 8 - İç Su Taşımacılığı) */
	transportModeCode?: string | null;
	/** Teslim semt/ilçe bilgisidir. */
	deliveryCitySubdivisionName?: string | null;
	/** Teslim il/şehir bilgisidir. */
	deliveryCity?: string | null;
	/** Teslim ülke adı bilgisidir. */
	deliveryCountry?: string | null;
	/** Kargo firmasının adı */
	cargoAccountName?: string | null;
	/** Kargo numarası */
	cargoNumber?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Özel oluşturulmış fatura görünümünüz var ise, bu fatura görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	supplierPartyIdentifer?: PartyIdentifierModel;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi VKN'sidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeVKN?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi unvanıdır. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeePartyName?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi ülke bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCountry?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi il bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCity?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi ilçe bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCitysubdivision?: string | null;
	supplierAgentAccount?: AgentAccountModel;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Eğer belge gönderim sırasında, belgenin tipinin değiştiği tesbit edilirse hata fırlatılıp fırlatılmayacağını belirleyen alan.
 Örneğin belge eğer EFATURA olarak gönderildiyse, ancak ilgili vknye earşiv fatura kesilmesi gerekiyorsa, sistem belge tipini otomatik değiştiriyor. 
 bu durumda sürecin ilerlemeyip hata verilmesi isteniyorsa bu parametre true gönderilmelidir. */
	isThrowExceptionOnEDocumentTypeChange?: boolean | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** Sigorta Bedeli */
	insuranceValueAmount?: number;
	/** Navlun Bedeli */
	declaredForCarriageValueAmount?: number;
	/** FOB Bedeli */
	freeOnBoardValueAmount?: number;
	taxRepresentative?: TaxRepresentativeModel;
	/** Taslak olarak kaydet. bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** Açıklama kısmında, fatura tutarının yazıyla olan karşılığının yazılması isteniyorsa bu parametre true olarak gönderilir. */
	isAddPayableAmountString?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Ödeme Bilgileri */
	paymentMeans?: PaymentMeans[] | null;
	invoiceAccount?: InvoiceOutboxAccountModel;
	/** Fatura üzerindeki vergi bilgileridir. Eğer boş gönderilirse, fatura üzerindeki vergi bilgisi detaylar üzerinden doldurulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	tax?: TaxTotal[] | null;
	/** Vergi muafiyeti bilgisidir. Eğer boş gönderilirse, detaylarda girilen vergi muafiyeti alanlarından oluşturulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	withholdingTax?: TaxTotal[] | null;
	/** İskonto/Artırım Listesi. Eğer boş gönderilirse, detaylarda girilen iskonto/artırım bilgilerinden oluşturulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	allowanceCharge?: AllowanceCharge[] | null;
	internetShipmentInfo?: InternetShipmentInfoModel;
	/** Hesaplama sistem tarafından mı yapılsın? Gönderilen verilerinizden fatura toplamları oluşması sistem tarafından mı sağlanacak yoksa gönderilen veriler mi baz alınacak bunula iligili parametredir. */
	isManuelCalculation?: boolean;
	invoiceCalculation?: InvoiceCalculationModel;
	/** Faturaya eklenmek istenen ek bilgiler bu kısımda yazılmalıdır. */
	additionalDocumentRef?: AdditionalDocumentRef[] | null;
	/** ESU Rapor bilgisidir. Bir faturada birden fazla ESU raporu gönderilebilir; liste (array) olarak iletilir. SARJ faturalarında zorunludur. */
	esuReportInfo?: ESUReportInfo[] | null;
	/** ESU Seri No bilgisidir. SARJ tipi faturalarda ESU rapor bilgisi ile birlikte kullanılır. */
	esuSeriNo?: string | null;
	/** Fatura Detay modelidir */
	invoiceDetail?: InvoiceOutboxDetailModel[] | null;
}

/**
 * Taslak için giden fatura model
 */
export interface InvoiceOutboxModelForDraft {
	/** Hesaplamaların API tarafından yapılıp yapılmayacağını belirtir. Eğer faturanın tüm hesaplamalarının API tarafından yapılması isteniyor ise bu alana true geçilmelidir. (Geliştirme Aşamasında) */
	isCalculateByApi?: boolean;
	/** Fatura Id alanıdır */
	id?: number;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** Belge Tipi alanıdır. string(Enum) ("EFATURA", "EARSIVFATURA", "ESMM", "EMM") */
	eDocumentType?: string | null;
	/** Fatura senaryosu bilgisidir. invoiceAccount altında bulunan VknTckn GİB e-fatura mükellef listesinde yer alıyor ise, 'EARSIVFATURA' dışındaki değerlerden biri gönderilmelidir.
 * invoiceAccount altında bulunan VknTckn GİB e-fatura mükellef kontrolü yapılarak bulunabileceği gibi, GİB e-fatura mükellef bilgilerini
 kendi sisteminize alıp kontrolleri sizin tarafından yapılmasınıda sağlayabilirsiniz.
 ("TEMELFATURA", "TICARIFATURA", "YOLCUBERABERFATURA", "IHRACAT", "OZELFATURA", "KAMU", "EARSIVFATURA", "HKS", "EARSIVBELGE", "ENERJI", "ILAC_TIBBICIHAZ", "YATIRIMTESVIK", "IDIS") */
	profile?: string | null;
	/** Fatura tipi bilgisidir.
 * profile değeri 'IHRACAT' ise, fatura tipi 'İSTİSNA' olmalıdır.
 * Fatura tipi 'IADE' ise, profile değeri  'TEMELFATURA', 'EARSIVFATURA', 'ILAC_TIBBICIHAZ', 'YATIRIMTESVIK', 'IDIS' veya 'KAMU' olabilir.
 * Fatura tipi 'TEKNOLOJIDESTEK' ise, profile değeri 'EARSIVFATURA' olmalıdır.
 ("SATIS", "IADE", "TEVKIFAT", "ISTISNA", "OZELMATRAH", "IHRACKAYITLI", "SGK", "KOMISYONCU", "HKSSATIS",
 "HKSKOMISYONCU", "KONAKLAMAVERGISI", "SARJ", "SARJANLIK",
 "TEKNOLOJIDESTEK", "YTBSATIS", "YTBISTISNA", "YTBIADE", "YTBTEVKIFAT", "YTBTEVKIFATIADE") */
	invoiceType?: string | null;
	/** Faturanın evrensel tekil tanımlama numarasıdır.
 Faturayı ilk gönderimde bu alanı boş geçebilirsiniz veya kendiniz bu alanı gönderebilirsiniz. */
	ettn?: string | null;
	/** Fatura numarası ön ek bilgisidir.Örn:MYF
 Sistem tarafından fatura numarası veriyorsa ve sistem üzerinde birden fazla ön ek değeriniz bulunuyor ise,
 bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden
 fatura numarası atanır. */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-fatura,e-arşiv, ve e-arşiv internet satış numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Fatura numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,boş ise varsayılan ön ek değeriniz 
 üzerinden fatura numarası atanır.
 Örnek:MYF2019000001220, 3 hane ön ek, 4 hane yıl bilgisi, 9 fatura numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** Fatura Tarihi alanıdır */
	docDate?: string;
	/** Fatura zamanı bilgisidir. e-Arşiv Faturalarda saat bilgisi koyma zorunluluğunuz bulunuyor. */
	docTime?: string;
	/** Vade Tarihi alanıdır */
	dueDate?: string | null;
	/** Fatura dönem başlangıç tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-01 */
	periodStartDate?: string | null;
	/** Fatura dönem başlangıç saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 08:00:00 */
	periodStartTime?: string | null;
	/** Fatura dönem bitiş tarihidir. yyyy-MM-dd formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 2026-09-30 */
	periodEndDate?: string | null;
	/** Fatura dönem bitiş saatidir. HH:mm:ss formatında olmalıdır. SARJ ve SARJANLIK faturalarında zorunludur. Örn: 18:00:00 */
	periodEndTime?: string | null;
	/** Fatura dönem açıklaması */
	periodDescription?: string | null;
	additionalInvoiceInfo?: AdditionalInvoiceInfoModel;
	/** Döviz tipi bilgisidir. */
	currencyCode?: string | null;
	/** Döviz kuru bilgisidir.'TRY' olması durumunda 1 değeri girilmelidir. */
	currencyRate?: number;
	/** E-Arşiv fatura için kullanılan gönderim tipi bilgisidir. string(enum) ("ELEKTRONIK", "KAGIT") */
	senderType?: string | null;
	/** Sipariş No alanıdır */
	orderNo?: string | null;
	/** Sipariş Tarihi alanıdır */
	orderDate?: string;
	/** İrsaliye bilgileri */
	waybillInfo?: WaybillInfo[] | null;
	/** İade fatura no bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceNo?: string | null;
	/** İade fatura tarihi bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceDate?: string;
	/** İade fatura açıklama bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefNote?: string | null;
	/** İade faturası birden fazla ise bu liste kullanılabilir. */
	billingRefInvoiceList?: ReturnInvoiceRefInfo[] | null;
	invesmentIncentiveInfo?: InvesmentIncentiveInfo;
	/** 702 istisna kodu seçildiğinde girilmesi gereken karşı belge numarası */
	counterDocNo?: string | null;
	/** Fatura not bilgisidir.Liste içerisinde birden fazla not eklemesi yapılabilir. */
	notes?: NoteModel[] | null;
	/** Alıcı firmanın posta kutusu, alias bilgisidir.Birden fazla alıcı posta kutusu olan bir firmaya fatura gönderecekseniz, tercih ettiğiniz
 alias bilgisini girebilirsiniz boş bırakılması durumunda sistem tarafından ilk gerçerili bulduğu posta kutusunu otomatik atanır.E-Arşiv faturalarda bu alan boş bırakılmalıdır. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,boş bırakılması durumunda
 firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
	/** İthalat İhracatta kullanılan teslimat şartları bilgisidir. Standart kod değerleri girilmelidir.(CFR,CIF,CIP,CPT,DAF,DDP,DDU,DEQ,DES,EXW,FAS,FCA,FOB,DAP,DAT) */
	deliveryTermCode?: string | null;
	/** Taşıma fazının hangi modda (hava, deniz, kara) gerçekleştiği bilgisidir.Standart kod değerleri girilmelidir.Değerler (0,1,2,3,4,5,6,7,8)
 Açıklama (0 - Boş, 1 - Denizyolu, 2 - Demiryolu, 3 - Karayolu, 4 - Havayolu, 5 - Posta, 6 - Çok Araçlı, 7 - Sabit Taşıma Tesisleri , 8 - İç Su Taşımacılığı) */
	transportModeCode?: string | null;
	/** Teslim semt/ilçe bilgisidir. */
	deliveryCitySubdivisionName?: string | null;
	/** Teslim il/şehir bilgisidir. */
	deliveryCity?: string | null;
	/** Teslim ülke adı bilgisidir. */
	deliveryCountry?: string | null;
	/** Kargo firmasının adı */
	cargoAccountName?: string | null;
	/** Kargo numarası */
	cargoNumber?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Özel oluşturulmış fatura görünümünüz var ise, bu fatura görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak fatura gönderilir. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	supplierPartyIdentifer?: PartyIdentifierModel;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi VKN'sidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeVKN?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi unvanıdır. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeePartyName?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi ülke bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCountry?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi il bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCity?: string | null;
	/** Kamu Faturalarında kullanılacak olan, ödemeyi yapacak harcama birimi ilçe bilgisidir. Kamu faturalarında bu alanın doldurulması zorunludur. */
	publicServicePayeeCitysubdivision?: string | null;
	supplierAgentAccount?: AgentAccountModel;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Eğer belge gönderim sırasında, belgenin tipinin değiştiği tesbit edilirse hata fırlatılıp fırlatılmayacağını belirleyen alan.
 Örneğin belge eğer EFATURA olarak gönderildiyse, ancak ilgili vknye earşiv fatura kesilmesi gerekiyorsa, sistem belge tipini otomatik değiştiriyor. 
 bu durumda sürecin ilerlemeyip hata verilmesi isteniyorsa bu parametre true gönderilmelidir. */
	isThrowExceptionOnEDocumentTypeChange?: boolean | null;
	/** Klasör Adı. Mysoft portal üzerinde tanımlı olan klasör adı geçilebilir. */
	folderName?: string | null;
	/** Sigorta Bedeli */
	insuranceValueAmount?: number;
	/** Navlun Bedeli */
	declaredForCarriageValueAmount?: number;
	/** FOB Bedeli */
	freeOnBoardValueAmount?: number;
	taxRepresentative?: TaxRepresentativeModel;
	/** Taslak olarak kaydet. bu alan true olarak gönderilirse, giden faturanın durumu taslak olarak kaydedilir. GİB'e gönderilmez. */
	isSaveAsDraft?: boolean;
	/** Taslak olarak kaydetme durumunda, eğer belge numarasıda oluşturulmak isteniyorsa bu parametre kullanılmalıdır. */
	isGenerateDocNoForDraft?: boolean;
	/** Açıklama kısmında, fatura tutarının yazıyla olan karşılığının yazılması isteniyorsa bu parametre true olarak gönderilir. */
	isAddPayableAmountString?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Ödeme Bilgileri */
	paymentMeans?: PaymentMeans[] | null;
	invoiceAccount?: InvoiceOutboxAccountModel;
	/** Fatura üzerindeki vergi bilgileridir. Eğer boş gönderilirse, fatura üzerindeki vergi bilgisi detaylar üzerinden doldurulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	tax?: TaxTotal[] | null;
	/** Vergi muafiyeti bilgisidir. Eğer boş gönderilirse, detaylarda girilen vergi muafiyeti alanlarından oluşturulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	withholdingTax?: TaxTotal[] | null;
	/** İskonto/Artırım Listesi. Eğer boş gönderilirse, detaylarda girilen iskonto/artırım bilgilerinden oluşturulur. Dolu gönderilirse, buradaki değerler dikkate alınır. */
	allowanceCharge?: AllowanceCharge[] | null;
	internetShipmentInfo?: InternetShipmentInfoModel;
	/** Hesaplama sistem tarafından mı yapılsın? Gönderilen verilerinizden fatura toplamları oluşması sistem tarafından mı sağlanacak yoksa gönderilen veriler mi baz alınacak bunula iligili parametredir. */
	isManuelCalculation?: boolean;
	invoiceCalculation?: InvoiceCalculationModel;
	/** Faturaya eklenmek istenen ek bilgiler bu kısımda yazılmalıdır. */
	additionalDocumentRef?: AdditionalDocumentRef[] | null;
	/** ESU Rapor bilgisidir. Bir faturada birden fazla ESU raporu gönderilebilir; liste (array) olarak iletilir. SARJ faturalarında zorunludur. */
	esuReportInfo?: ESUReportInfo[] | null;
	/** ESU Seri No bilgisidir. SARJ tipi faturalarda ESU rapor bilgisi ile birlikte kullanılır. */
	esuSeriNo?: string | null;
	/** Fatura Detay modelidir */
	invoiceDetail?: InvoiceOutboxDetailModel[] | null;
	/** Taslak belge gösteriminde eğer görüntü üzerinde TASLAK ifadesi yazılması isteniyorsa bu parametre true olarak geçilir. */
	isPrintDraftWatermark?: boolean | null;
}

/**
 * Fatura sonuç nesnesi
 */
export interface InvoiceOutboxResultModel {
	/** Fatura Id */
	invoiceId?: number;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Fatura belge numarası */
	docNo?: string | null;
}

export interface InvoiceOutboxResultModelResultModel {
	data?: InvoiceOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden faturanın durumunu belirten sınıftır.
 */
export interface InvoiceOutboxStatusResultModel {
	/** Giden Fatura Id */
	id?: number;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Fatura Numarası */
	docNo?: string | null;
	/** Fatura Durumları (BOS,IPTAL_EDILDI,TASLAK,ARSIV_KAYIT_KUYRUGUNDA,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,KABUL_KUYRUGUNDA,RED_KUYRUGUNDA,YANIT_BEKLENIYOR,KABUL,RED,HATA,ONAYLANDI(e-Arşiv faturalar için)) */
	invoiceStatusText?: string | null;
	/** Fatura red nedeni açıklaması */
	declineReason?: string | null;
	/** Zarf UUID */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
	/** Zarf GİB'e gönderim zamanı */
	envelopeProcessTime?: string | null;
	/** Döküman Tipi (EFATURA(1),EARSIVFATURA(2)) */
	eDocumentType?: number;
	/** Gümrük Ticaret Bakanlığı Referans No */
	gTBRefNo?: string | null;
	/** Gümrük Ticaret Bakanlığı GCB Kayıt numarası */
	gTBGCBRegistryNo?: string | null;
	/** Gümrük Ticaret Bakanlığı Gerçekleşen İhracat Tarihi */
	gTBActualExportDate?: string | null;
	/** Hatalı zarfların tekrar gönderim deneme sayısı */
	tryCount?: number;
}

export interface InvoiceOutboxStatusResultModelListResultModel {
	data?: InvoiceOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface InvoiceOutboxStatusResultModelResultModel {
	data?: InvoiceOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İlgili Tarihler için gelen fatura listesini veren parametre sınıfı
 */
export interface InvoiceResultListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Başlangıç Tarihi YYYY-MM-DD olarak girilmelidir. */
	startDate?: string | null;
	/** Bitiş Tarihi YYYY-MM-DD olarak girilmelidir. */
	endDate?: string | null;
	/** İlgili İrsaliyenin ETTN Numarasıdır. */
	invoiceETTN?: string | null;
	/** İşlem Türü (örn: SATIŞ, ALIŞ, PROFORMA ALIŞ) */
	transactionTypeName?: string | null;
}

/**
 * Fatura List Result Model
 */
export interface InvoiceResultModel {
	/** Kayıt/belge için benzersiz kimlik. */
	id: number;
	/** Kaydı ilk oluşturan kullanıcının adı. */
	createUserName?: string | null;
	/** Oluşturulma tarihi-zamanı (UTC/yerel sistem saatine göre). */
	createDate?: string;
	/** Kaydı ilk oluşturan kullanıcının adı. */
	updateUserName?: string | null;
	/** Oluşturulma tarihi-zamanı (UTC/yerel sistem saatine göre). */
	updateDate?: string | null;
	/** Faturanın ETTN (Elektronik Transfer Tanımlama Numarası). */
	invoiceEttn?: string | null;
	/** Portal üzerindeki fatura durum kodu. */
	portalInvoiceStatus?: number | null;
	/** Portal fatura durumunun metin karşılığı. */
	portalInvoiceStatusEnumText?: string | null;
	/** Firmanın GİB gönderici posta kutusu. */
	tenantGBAlias?: string | null;
	/** Belge numarası ön eki (seri). */
	documentNumberPrefix?: string | null;
	/** Belge/fatura numarası. */
	docNo?: string | null;
	/** Belge tarihi. */
	docDate?: string;
	/** Belge saati. */
	docTime?: string;
	/** Fatura İşlem Türü Adıdır. */
	transactionTypeName?: string | null;
	/** Alış/Satış yönü. */
	purchaseSales?: number;
	/** E-belge profil tipi metin karşılığı. */
	profileEnumText?: string | null;
	/** E-fatura tipi kodunun metin karşılığı. */
	eInvoiceTypeCodeEnumText?: string | null;
	/** E-belge türünün metin karşılığı (e-Fatura, e-Arşiv Fatura vb.). */
	eDocumentTypeEnumText?: string | null;
	/** Belge para birimi kodu. */
	currencyCode?: string | null;
	/** Kur (1 birim yabancı para = x yerel para). */
	currencyRate?: number;
	/** Müşteri / Tedarikçi (alıcı/satıcı) cari hesap kimliği. */
	accountId?: number | null;
	/** Müşteri / Tedarikçi türü (şahıs/kurum vb.). */
	accountType?: number;
	/** Cari hesap kodu. */
	accountCode?: string | null;
	/** Müşteri / Tedarikçi VKN/TCKN bilgisi. */
	accountVknTckn?: string | null;
	/** Müşteri / Tedarikçi tam ticari/adi adı. */
	accountName?: string | null;
	/** Müşteri / Tedarikçi adı (şahıs ise). */
	accountFirstName?: string | null;
	/** Müşteri / Tedarikçi soyadı (şahıs ise). */
	accountFamilyName?: string | null;
	/** Müşteri / Tedarikçi Ülke kodu (ISO). */
	accountCountryCode?: string | null;
	/** Müşteri / Tedarikçi Ülke adı. */
	accountCountryName?: string | null;
	/** Müşteri / Tedarikçi Şehir adı. */
	accountCityName?: string | null;
	/** Müşteri / Tedarikçi Posta kutusu bilgisi. */
	accountPostbox?: string | null;
	/** Müşteri / Tedarikçi Daire/ofis numarası. */
	accountRoom?: string | null;
	/** Müşteri / Tedarikçi Cadde/sokak adı. */
	accountStreetName?: string | null;
	/** Müşteri / Tedarikçi Blok adı. */
	accountBlockName?: string | null;
	/** Müşteri / Tedarikçi Bina adı. */
	accountBuildingName?: string | null;
	/** Müşteri / Tedarikçi Bina numarası. */
	accountBuildingNumber?: string | null;
	/** Müşteri / Tedarikçi İlçe/mahalle adı. */
	accountCitySubdivisionName?: string | null;
	/** Müşteri / Tedarikçi Posta kodu. */
	accountPostalCode?: string | null;
	/** Müşteri / Tedarikçi Bölge/eyalet. */
	accountRegion?: string | null;
	/** Müşteri / Tedarikçi İlçe (alternatif alan). */
	accountDistrict?: string | null;
	/** Müşteri / Tedarikçi Telefon numarası. */
	accountTelephone1?: string | null;
	/** Müşteri / Tedarikçi Faks numarası. */
	accountFax1?: string | null;
	/** Müşteri / Tedarikçi E-posta adresi. */
	accountEmail1?: string | null;
	/** Müşteri / Tedarikçi Cep telefonu. */
	accountMobilePhone1?: string | null;
	/** Müşteri / Tedarikçi Vergi dairesi kodu. */
	accountTaxOfficeCode?: string | null;
	/** Müşteri / Tedarikçi Vergi dairesi adı. */
	accountTaxOfficeName?: string | null;
	/** Müşteri / Tedarikçi Web sitesi adresi. */
	accountWebSiteURL?: string | null;
	/** GİB Posta Kutusu (PK) alias’ı. */
	accountPKAlias?: string | null;
	/** Müşteri / Tedarikçi Şube adı (muhatap). */
	accountBranchName?: string | null;
	/** Sipariş numarası. */
	orderNo?: string | null;
	/** Sipariş tarihi. */
	orderDate?: string | null;
	/** İrsaliye numarası. */
	waybillNo?: string | null;
	/** İrsaliye tarihi. */
	waybillDate?: string | null;
	/** Vade günü sayısı (net gün). */
	dueDay?: number | null;
	/** Son ödeme tarihi (vade). */
	dueDate?: string | null;
	/** Kullanılan XSLT şablonunun adı. */
	tenantXsltName?: string | null;
	/** Belgenin kategori adı/etiketi. */
	categoryName?: string | null;
	/** Belgenin/klasör adı. */
	folderName?: string | null;
	/** Depo kodu. */
	warehouseCode?: string | null;
	/** Depo ADI. */
	warehouseName?: string | null;
	/** Iskonto düşülmemiş satır toplamları (TRY) */
	lineExtensionAmt?: number;
	/** Iskonto düşülmüş satır toplamları (Belge Para Birimi) */
	lineExtensionAmtTra?: number;
	/** Iskonto düşülmüş vergiler hariç tutar (TRY) */
	taxExclusiveAmt?: number;
	/** Iskonto düşülmüş vergiler hariç tutar (Belge Para Birimi) */
	taxExclusiveAmtTra?: number;
	/** Toplam iskonto (TRY) */
	allowanceTotalAmt?: number;
	/** Toplam iskonto (Belge Para Birimi) */
	allowanceTotalAmtTra?: number;
	/** Toplam masraf/ilave ücret (TRY) */
	chargeTotalAmt?: number;
	/** Toplam masraf/ilave ücret (Belge Para Birimi) */
	chargeTotalAmtTra?: number;
	/** Manuel girilen toplam iskonto (TRY) */
	manuelAllowanceTotalAmt?: number;
	/** Manuel iskonto toplam iskonto (Belge Para Birimi) */
	manuelAllowanceTotalAmtTra?: number;
	/** Iskonto düşülmüş vergiler dahil tutar (TRY) */
	taxInclusiveAmt?: number;
	/** Iskonto düşülmüş vergiler dahil tutar (Belge Para Birimi) */
	taxInclusiveAmtTra?: number;
	/** Yuvarlama tutarı (TRY) */
	payableRoundingAmt?: number;
	/** Yuvarlama tutar (Belge Para Birimi) */
	payableRoundingAmtTra?: number;
	/** Ödenecek nihai tutar (TRY) */
	payableAmt?: number;
	/** Ödenecek tutar (Belge Para Birimi) */
	payableAmtTra?: number;
	/** İlgili ek belge numarası (ör. teklif, sözleşme) */
	additionalDocNo?: string | null;
	/** Ek e-belge türü */
	additionalEDocumentType?: number | null;
	/** Dayanak/alındığı faturanın tarihi. (IADE için) */
	billingRefInvoiceDate?: string | null;
	/** Dayanak/alındığı faturanın numarası.(IADE için) */
	billingRefInvoiceNo?: string | null;
	/** Faturalama referans notu/açıklaması.(IADE için) */
	billingRefNote?: string | null;
	/** Kargo/taşıma numarası (takip). */
	cargoNumber?: string | null;
	/** Silinme tarihi (varsa). */
	deletedDate?: string | null;
	/** Teslimat adresi bina adı. */
	deliveryBuildingName?: string | null;
	/** Teslimat adresi bina no. */
	deliveryBuildingNumber?: string | null;
	/** Teslimat şehir adı. */
	deliveryCityName?: string | null;
	/** Teslimat ilçe/mahalle adı. */
	deliveryCitySubdivisionName?: string | null;
	/** Teslimat ülke kodu. */
	deliveryCountryCode?: string | null;
	/** Teslimat ülke adı */
	deliveryCountryName?: string | null;
	/** Teslimat posta kodu. */
	deliveryPostalCode?: string | null;
	/** Teslimat cadde/sokak adı. */
	deliveryStreetName?: string | null;
	/** Teslimat/INCOTERM kodu (örn. EXW, FOB). */
	deliveryTermCode?: string | null;
	/** Harici/işlem referans numarası. */
	docRefNo?: string | null;
	/** E-Fatura - E-Arşiv Fatura Tipi */
	eInvoiceTypeEnumText?: string | null;
	/** HKS kapsamındaki toplam indirim, (TRY) */
	hksAllowanceTotalAmt?: number;
	/** HKS indirim toplamı (Belge Para Birimi) */
	hksAllowanceTotalAmtTra?: number;
	/** Sigorta tutarı (Belge Para Birimi) */
	insuranceAmtTra?: number;
	/** İnternet satışında hesap/ad bilgisi. */
	internetAccountName?: string | null;
	/** İnternetten ödeme tarihi. */
	internetPaymentDate?: string | null;
	/** İnternet ödeme notu. */
	internetPaymentNote?: string | null;
	/** İnternet ödeme türü (kart, havale vb.). */
	internetPaymentTypeEnumText?: string | null;
	/** İnternet satış adresi/URL. */
	internetWebSiteURL?: string | null;
	/** Fatura durum bilgisi */
	invoiceStatus?: number | null;
	/** Faturanın entegrasyon/transfer durumu. */
	invoiceTransferStatus?: number | null;
	/** Muhasebe dövizli mi? (true/false). */
	isCurrencyAccounting?: boolean;
	/** İnternet satış bilgisi var mı? (true/false). */
	isInternetSalesInfo?: boolean;
	/** ÖKC fiş bilgisi var mı? (true/false). */
	isOkcReceiptInfo?: boolean;
	/** Sevkiyat bilgisi var mı? (true/false). */
	isShippingInfo?: boolean;
	/** Araç plaka bilgisi. */
	lincencePlate?: string | null;
	/** NACE faaliyet kodu. */
	naceCode?: string | null;
	/** ÖKC fiş tarihi. */
	okcReceiptDate?: string | null;
	/** ÖKC fiş saati. */
	okcReceiptTime?: string | null;
	/** ÖKC fiş tür kimliği. */
	okcReceiptTypeId?: number | null;
	/** ÖKC seri numarası. */
	okcSerialNo?: string | null;
	/** ÖKC Z rapor numarası. */
	okcZReportNo?: string | null;
	/** Yolcu bankası şube adı (yolcu taşımacılığı senaryosu). */
	passengerBankBranchName?: string | null;
	/** Yolcu bankası adı. */
	passengerBankName?: string | null;
	/** Yolcu şehir adı. */
	passengerCityName?: string | null;
	/** YYolcu IBAN numarası. */
	passengerIbanNo?: string | null;
	/** Düzenleme tarihi (bilet vb.). */
	passengerIssueDate?: string | null;
	/** Uyruk kodu/ID. */
	passengerNationalityId?: number | null;
	/** Ödeme notu (yolcu). */
	passengerPaymentNote?: string | null;
	/** Ödeme yapılacak hesap adı. */
	paymentAccountName?: string | null;
	/** Ödeme hesabının VKN/TCKN bilgisi. */
	paymentAccountVknTckn?: string | null;
	/** Ödeme vade tutarı. */
	paymentTermAmount?: number;
	/** Ödeme vade tarihi. */
	paymentTermDueDate?: string | null;
	/** Vade/ödeme şartı notu. */
	paymentTermNote?: string | null;
	/** Gecikme cezası oranı (%). */
	paymentTermPenaltySurchargePercent?: number;
	/** Dönem bitiş tarihi */
	periodEndDate?: string | null;
	/** Dönem başlangıç tarihi */
	periodStartDate?: string | null;
	/** Kaydın geldiği kaynak (portal, entegrasyon vb.). */
	recordSource?: number | null;
	/** Gönderici türü (mükellef/entegratör vb.). */
	senderType?: number | null;
	/** SGK harcama birimi adı */
	sgkSpendingUnitName?: string | null;
	/** Sevkiyat takip numarası. */
	shipmentFollowNo?: string | null;
	/** Sevkiyat sağlayıcı adı. */
	shippingAccountName?: string | null;
	/** Sevkiyat hesabı türü. */
	shippingAccountType?: number | null;
	/** Sevkiyat hesabı VKN/TCKN. */
	shippingAccountVknTckn?: string | null;
	/** Sevkiyat tarihi. */
	shippingDate?: string | null;
	/** Mağaza/kanal tarafına PDF linki gönderim durumu. */
	shopSidePdfLinkSendStatus?: number | null;
	/** Mükellef şube adı. */
	tenantBranchName?: string | null;
	/** İşlem kaynağı. */
	transactionSource?: number | null;
	/** Taşıma/lojistik tutarı, işlem/döviz para birimi karşılığı. */
	transportationAmtTra?: number;
	/** Taşıma modu kodu (kara, hava vb.). */
	transportModeCode?: string | null;
	/** Araç numarası / filo no. */
	vehicleNumber?: string | null;
	/** Fatura Detay modelidir */
	invoiceDetail?: InvoiceDetailResultModel[] | null;
	/** Fatura Not modelidir */
	invoiceNote?: InvoiceNoteResultModel[] | null;
}

export interface InvoiceResultModelListResultModel {
	data?: InvoiceResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Fatura Detail Tax List Result Model
 */
export interface InvoiceTaxResultModel {
	/** Vergi satırının benzersiz kimlik numarası. */
	id: number;
	/** İlgili faturanın kimliği (üst kayıtla ilişkilendirme). */
	invoiceId: number;
	/** Faturaya ait detay (satır) kimliği. */
	invoiceDetailId: number;
	/** Vergiye esas tutar (TRY) */
	taxableAmt?: number;
	/** Vergiye esas tutarı (Belge Para Birimi) */
	taxableAmtTra?: number;
	/** Vergi hesaplama sırası (1, 2, 3 gibi). */
	calculationSequenceNumeric?: number | null;
	/** Vergi tutarı (TRY) */
	taxAmt?: number;
	/** Vergi tutarı (Belge Para Birimi) */
	taxAmtTra?: number;
	/** Vergi oranı (%). */
	percentage?: number;
	/** Vergi tür kodu (örneğin: KDV, ÖTV, STOPAJ). */
	taxTypeCode?: string | null;
	/** Vergi tür adı (örneğin: Katma Değer Vergisi). */
	taxTypeName?: string | null;
	/** Vergi istisna neden kodu. */
	taxExemptionReasonCode?: string | null;
	/** Vergi istisna neden açıklaması. */
	taxExemptionReasonName?: string | null;
}

/**
 * Fatura modeli zarf bilgileri ile birlikte
 */
export interface InvoiceWithEnvelopeForApiModel {
	/** Fatura profile Id */
	profileId?: string | null;
	/** Belge numarası */
	docNo?: string | null;
	/** Fatura ETTN */
	invoiceETTN?: string | null;
	/** Fatura tarihi */
	docDate?: string | null;
	/** Fatura zamanı */
	docTime?: string | null;
	/** Vade Tarihi */
	dueDate?: string | null;
	/** Fatura tipi */
	invoiceTypeCode?: string | null;
	/** Fatura notları */
	noteList?: string[] | null;
	/** Belge para birimi */
	documentCurrencyCode?: string | null;
	customerInfo?: InvoiceForApiCustomerInfoModel;
	supplierInfo?: InvoiceForApiCustomerInfoModel;
	currencyRateInfo?: InvoiceForApiCurrencyRateInfoModel;
	/** Vergi bilgileri */
	taxTotal?: InvoiceForApiTaxTotalModel[] | null;
	/** Tevkifat bilgileri */
	witholdingTaxTotal?: InvoiceForApiTaxTotalModel[] | null;
	legalMonetaryTotal?: InvoiceForApiLegalMonetaryTotalModel;
	/** Fatura detayları */
	detailList?: InvoiceForApiDetailModel[] | null;
	/** Zarf ETTN */
	envelopeIdentifierNumber?: string | null;
	/** Gönderici birimi */
	senderAlias?: string | null;
	/** Alıcı birimi */
	receiverAlias?: string | null;
	/** Gönderici Vkn Tckn */
	senderIdentifier?: string | null;
	/** Alıcı Vkn Tckn */
	receiverIdentifier?: string | null;
	/** Zarf durum kodu */
	envelopeStatus?: number;
	/** Zarf durum açıklaması */
	envelopeStatusDesc?: string | null;
	/** Zarfın oluştuğu sistemdeki oluşma zamanı */
	envelopeCreationDate?: string;
	/** Zarfın MYSOFT sistemindeki oluşma zamanı */
	envelopeCreateDate?: string;
}

export interface InvoiceWithEnvelopeForApiModelResultModel {
	data?: InvoiceWithEnvelopeForApiModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface Irsaliye {
	no?: string | null;
	tarih?: string;
}

/**
 * Stok özellik sınıfı
 */
export interface ItemInstance {
	/** Stok Seri Numarasıdır. (YTB faturalarında Makine ID) SARJANLIK faturalarında her fatura kaleminde zorunludur. */
	serialId?: string | null;
	/** Stok hizmet için Gümrük Takip Numarasıdır. YTB faturalarında Makine Teçhizat Sıra No
 bilgilerinin yazılması gerekmektedir. */
	productTraceId?: string | null;
	/** Stok için ek bilgiler */
	additionalItemIdentification?: IdentificationType[] | null;
}

/**
 * KVKK izin durumunu veren sınıf
 */
export interface KVKKStatusResultModel {
	/** Onay Durumu */
	isApproved?: boolean;
	/** Onay Tarihi */
	approveDate?: string | null;
	/** İzin Tipi */
	consentsType?: string | null;
	/** İzin Adı */
	consentsName?: string | null;
}

export interface KVKKStatusResultModelListResultModel {
	data?: KVKKStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface KarayoluTasimaciligi {
	plakaNo?: string | null;
}

export type KaynakDokumanTuru = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Tıbbi cihaz ilaç işlemleri için gerekli bilgileri tutar
 */
export interface MedicineMedicalEquipmentInfo {
	/** Bu alana ILAC, TIBBICIHAZ yada DIGER yazılabilir. */
	schemaId?: string | null;
	/** İlaç veya Tibbi cihaz detay bilgileri */
	medicineMedicalEquipmentDetail?: MedicineMedicalEquipmentInfoDetail[] | null;
}

/**
 * İlaç veya Tibbi cihaz detay bilgileri
 */
export interface MedicineMedicalEquipmentInfoDetail {
	/** schemaId = ILAC olması durumunda (Küresel Ticari Ürün Numarası) , schemaId = TIBBICIHAZ olması durumunda (Ürün Numarası) yazılacaktır */
	productNumber?: string | null;
	/** Parti/Lot numarası yazılacaktır */
	batchNumber?: string | null;
	/** Seri/Sıra numarası yazılacaktır */
	serialNumber?: string | null;
	/** schemaId = ILAC olması durumunda (Son Kullanma Tarihi) , schemaId = TIBBICIHAZ olması durumunda (Üretim Tarihi) yazılacaktır.Format(ddMMyy) şeklinde olacaktır. */
	baseDate?: string | null;
}

/**
 * Firma aylık kontör kullanım bilgisi
 */
export interface MonthlyCreditConsumptionModel {
	/** Kontör kullanım yıl bilgisi */
	year?: number;
	/** Kontör kullanım ay bilgisi */
	month?: number;
	/** Kullanılan kontör miktar bilgisi */
	qty?: number;
}

export interface MonthlyCreditConsumptionModelQueryResultList {
	data?: MonthlyCreditConsumptionModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Firma aylık kontör bilgilerinin sorgu modeli
 */
export interface MonthlyCreditConsumptionRequestModel {
	/** İlgili firmanın VKN/TCKN'si */
	identifierNumber: string;
	/** Aylık kontör bilgilerinin yıl değeridir. */
	year: number;
}

/**
 * Çoklu irsaliye indirme istek modeli
 */
export interface MultipleDespatchInboxOnePdfPostRequestModel {
	/** İrsalite ettn listesi */
	despatchETTNList?: string[] | null;
	/** Kağıt boyutu. 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra),
 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated) */
	paperSize?: number | null;
	/** Kağıt eni */
	paperWidth?: number | null;
	/** Kağıt boyu */
	paperHeight?: number | null;
	/** İşlem yapılacak Müşteri VKN, 
 Login olan kullanıcının varsayılan hesabından farklı bir hesapla işlem yapılmak isteniyorsa doldurulmalıdır */
	tenantIdentifierNumber?: string | null;
}

/**
 * Çoklu irsaliye indirme istek modeli
 */
export interface MultipleDespatchOutboxOnePdfPostRequestModel {
	/** İrsalite ettn listesi */
	despatchETTNList?: string[] | null;
	/** Kağıt boyutu. 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra),
 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated) */
	paperSize?: number | null;
	/** Kağıt eni */
	paperWidth?: number | null;
	/** Kağıt boyu */
	paperHeight?: number | null;
	/** İşlem yapılacak Müşteri VKN, 
 Login olan kullanıcının varsayılan hesabından farklı bir hesapla işlem yapılmak isteniyorsa doldurulmalıdır */
	tenantIdentifierNumber?: string | null;
}

/**
 * Çoklu fatura pdf dönen model
 */
export interface MultipleInvoiceOutboxAsOnePdfRequestModel {
	/** Fatura ettn listesi. En fazla 50 adet ettn yazılabilir. */
	invoiceETTNList?: string[] | null;
	/** Kağıt boyutu. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra),
 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated) */
	paperSize?: number | null;
	/** Kağıt Eni */
	paperWidth?: number | null;
	/** Kağıt Boyu */
	paperHeight?: number | null;
	/** İşlem yapılacak Müşteri VKN, 
 Login olan kullanıcının varsayılan hesabından farklı bir hesapla işlem yapılmak isteniyorsa doldurulmalıdır */
	tenantIdentifierNumber?: string | null;
}

export interface Musteri {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
	alias?: string | null;
}

/**
 * Firma Nace Kdv Oranları sınıfı
 */
export interface NaceListViewModel {
	/** Faaliyet alanı kodu. */
	naceCode?: string | null;
	/** Faaliyet alanı açıklaması. */
	naceName?: string | null;
	/** İlgili nace için kullanılabilir kdv oranı. */
	vatRate?: number;
	/** Faaliyet alanı başlangıç tarihi. */
	startDate?: string | null;
	/** Faaliyet alanı bitiş tarihi. */
	enddate?: string | null;
	/** İstisna nedeni açıklaması. */
	exemptionLawDescription?: string | null;
	/** Açıklama. */
	note?: string | null;
}

export interface NaceListViewModelListResultModel {
	data?: NaceListViewModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface NetleBelge {
	guid?: string | null;
	no?: string | null;
	erpFatNo?: string | null;
	barkodUrl?: string | null;
	aciklama?: string | null;
	duzenlenmeTarihi?: string;
	tip?: NetleEFaturaType;
	senaryo?: NetleEFaturaSenaryoType;
	siparisNo?: string | null;
	siparisTarihi?: string;
	siparisTarihiSpecified?: boolean;
	irsaliyeNo?: string | null;
	irsaliyeTarihi?: string;
	irsaliyeTarihiSpecified?: boolean;
	toplamTutar?: number;
	odenecekToplamTutar?: number;
	dovizTipi?: string | null;
	iskontoTutari?: number;
	vergilendirilecekToplamTutar?: number;
	yuvarlamaTutari?: number;
	vergiMuafiyetNedeni?: string | null;
	kdvMuafiyetNedeni?: string | null;
	kdvTutari?: number;
	kkdfKesintiMuafiyetNedeni?: string | null;
	kkdfKesintiTutari?: number;
	petrolDogalgazOTVMuafiyetNedeni?: string | null;
	petrolDogalgazOTVTutari?: number;
	dayanikliTuketimOTVMuafiyetNedeni?: string | null;
	dayanikliTuketimOTVTutari?: number;
	alkolluIcecekOTVMuafiyetNedeni?: string | null;
	alkolluIcecekOTVTutari?: number;
	tutunMamulleriOTVMuafiyetNedeni?: string | null;
	tutunMamulleriOTVTutari?: number;
	kolaliGazozOTVMuafiyetNedeni?: string | null;
	kolaliGazozOTVTutari?: number;
	dvMuafiyetNedeni?: string | null;
	dvTutari?: number;
	dvKanun5035MuafiyetNedeni?: string | null;
	dvKanun5035Tutari?: number;
	oivMuafiyetNedeni?: string | null;
	oivTutari?: number;
	oivKanun5035MuafiyetNedeni?: string | null;
	oivKanun5035Tutari?: number;
	kdvTevkifatMuafiyetNedeni?: string | null;
	kdvTevkifatTutari?: number;
	bsmvMuafiyetNedeni?: string | null;
	bsmvTutari?: number;
	motorluTasitlarOTVMuafiyetNedeni?: string | null;
	motorluTasitlarOTVTutari?: number;
	borsaTescilUcretMuafiyetNedeni?: string | null;
	borsaTescilUcretTutari?: number;
	enerjiFonuMuafiyetNedeni?: string | null;
	enerjiFonuTutari?: number;
	belediyeTuketimVergisiMuafiyetNedeni?: string | null;
	belediyeTuketimVergisiTutari?: number;
	trtPayiMuafiyetNedeni?: string | null;
	trtPayiTutari?: number;
	elektrikTuketimVergisiMuafiyetNedeni?: string | null;
	elektrikTuketimVergisiTutari?: number;
	stopajMuafiyetNedeni?: string | null;
	stopajTutari?: number;
	telsizKullanimAylikTaksitMuafiyetNedeni?: string | null;
	telsizKullanimAylikTaksitTutari?: number;
	telsizRuhsatUcretiMuafiyetNedeni?: string | null;
	telsizRuhsatUcretiTutari?: number;
	cevreTemizlikVergisiMuafiyetNedeni?: string | null;
	cevreTemizlikVergisiTutari?: number;
	xsltPath?: string | null;
	toplamTutarDovizTipi?: string | null;
	toplamTutarDovizKuru?: number;
	odemeDovizTipi?: string | null;
	odemeDovizKuru?: number;
	tedarikci?: Tedarikci;
	musteri?: Musteri;
	faturaKalemleri?: FaturaKalemi[] | null;
	vergiler?: Vergi[] | null;
	ekSahalar?: EkSaha[] | null;
	ekAciklamalar?: string[] | null;
	artirimTutari?: number;
	vergilerDahilTutar?: number;
	vergilerHaricTutar?: number;
	irsaliyeler?: Irsaliye[] | null;
	kdvMatrahi?: number;
	kkdfKesintiMatrahi?: number;
	petrolDogalgazOTVMatrahi?: number;
	dayanikliTuketimOTVMatrahi?: number;
	alkolluIcecekOTVMatrahi?: number;
	tutunMamulleriOTVMatrahi?: number;
	kolaliGazozOTVMatrahi?: number;
	dvMatrahi?: number;
	dvKanun5035Matrahi?: number;
	oivMatrahi?: number;
	oivKanun5035Matrahi?: number;
	kdvTevkifatMatrahi?: number;
	bsmvMatrahi?: number;
	motorluTasitlarOTVMatrahi?: number;
	borsaTescilUcretMatrahi?: number;
	enerjiFonuMatrahi?: number;
	belediyeTuketimVergisiMatrahi?: number;
	trtPayiMatrahi?: number;
	elektrikTuketimVergisiMatrahi?: number;
	stopajMatrahi?: number;
	telsizKullanimAylikTaksitMatrahi?: number;
	telsizRuhsatUcretiMatrahi?: number;
	cevreTemizlikVergisiMatrahi?: number;
	vergiTemsilcisi?: VergiTemsilcisi;
	saticiTedarikcisi?: SaticiTedarikcisi;
	aliciMusteri?: AliciMusteri;
	saticiSiparisNo?: string | null;
	siparisTuruKodu?: string | null;
	okcBilgiFisleri?: OKCBilgiFisi[] | null;
	kaynakDokumanTuru?: KaynakDokumanTuru;
	gonderi?: Gonderi;
	sevkIrsaliye?: SevkIrsaliye;
	sgkOzelFaturaAlanlari?: SGKOzelFaturaAlanlari;
	gonderimTipi?: GonderimTipi;
}

/**
 * NetleBelge tipinde fatura bilgilerini içeren sınıf
 */
export interface NetleBelgeRequestModel {
	netleBelge?: NetleBelge;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan fatura dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

export type NetleEFaturaSenaryoType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type NetleEFaturaType =
	0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

/**
 * Açıklama
 */
export interface NoteModel {
	/** Not alanı */
	note?: string | null;
}

/**
 * Bildirim ayarları
 */
export interface NotificationSettingsModel {
	/** Firmaya eklenmek istenen bildirim tipi bilgisidir. Bildirim Kodu gönderilir.
	 *Mysoft Portalde Firma bilgileri>Belge Ayarları ekranındaki Bildirimler sekmesinden bildirim kodlarına erişebilir. */
	notificationCode: string;
	/** Mail gönderilecek sabit e-posta bilgisidir. */
	staticMailTo?: string | null;
	/** Maillerin belge üzerindeki e-postaya gönderilip gönderilmeyeceğinin bilgisidir. */
	isSendDocumentMail?: boolean;
	/** Bilgi maili gönderilecek sabit e-posta bilgisidir. */
	sentBccMail?: string | null;
	/** Mail içeriğine gönderilen belgenin PDF dosyasının eklenip eklenmeyeceğinin bilgisidir. */
	isAttachPDF?: boolean;
	/** Mail içeriğine gönderilen belgenin XML dosyasının eklenip eklenmeyeceğinin bilgisidir. */
	isAttachXML?: boolean;
	/** Eklenen bildirim tipinin firmaya göre özelleştirilip özelleştirilmeyeceğinin bilgisidir. */
	isCustomized?: boolean;
	/** E-posta alıcılarına gösterilmek istenen ad bilgisidir. */
	displayName?: string | null;
	/** Yanıt gönderilecek adres bilgisidir. */
	replyTo?: string | null;
}

/**
 * Numaratör set tanımı
 */
export interface NumeratorSetApiViewModel {
	/** Numaratör set kodu */
	numeratorSetCode?: string | null;
	/** Numaratör set adı */
	numeratorSetName?: string | null;
	/** E-Fatura numaratör ön eki */
	eInvoiceNumberPrefix?: string | null;
	/** E-Arşiv Fatura numaratör ön eki */
	eArchiveNumberPrefix?: string | null;
	/** İnternet satış numaratör ön eki */
	internetSalesNumberPrefix?: string | null;
	/** E-Döviz Satım numaratör ön eki */
	eExchangeDocumentSalesNumberPrefix?: string | null;
	/** E-Döviz Alım numaratör ön eki */
	eExchangeDocumentPurchaseNumberPrefix?: string | null;
	/** E-Adisyon numaratör ön eki */
	eBillDocumentNumberPrefix?: string | null;
	/** E-Gider Pusulası numaratör ön eki */
	eExpenseVoucherNumberPrefix?: string | null;
}

export interface NumeratorSetApiViewModelListResultModel {
	data?: NumeratorSetApiViewModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Numaratör seti özet bilgisi
 */
export interface NumeratorSetItemViewModel {
	/** Numaratör set kodu */
	numeratorSetCode?: string | null;
	/** Numaratör set adı */
	numeratorSetName?: string | null;
}

export interface OKCBilgiFisi {
	no?: string | null;
	tarih?: string;
	tip?: OKCBilgiFisiTipi;
	zRaporuNo?: string | null;
	okcSeriNo?: string | null;
}

export type OKCBilgiFisiTipi = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Sipariş iskonto ve arttırım bilgilerini içeren model.
 * Sipariş veya sipariş detayı bazında uygulanan iskonto ve arttırım kayıtlarını temsil eder.
 */
export interface OrderAllowanceChargeResultModel {
	/** Kayıt için benzersiz kimlik. */
	id?: number;
	/** Bağlı olduğu siparişin kimliği. */
	orderId?: number;
	/** Bağlı olduğu sipariş detayının kimliği. */
	orderDetailId?: number | null;
	/** Çarpan faktörü (iskonto veya arttırım çarpanı). */
	multiplierFactorNumeric?: number;
	/** Sıra numarası. */
	sequenceNumeric?: number;
	/** Tutar (işlem para birimi). */
	amtTra?: number;
	/** İskonto / arttırım notu. */
	allowanceNote?: string | null;
	/** Masraf göstergesi (İskonto / Arttırım). */
	chargeIndicator?: string | null;
	/** İskonto / arttırım nedeni. */
	allowanceChargeReason?: string | null;
	/** İskonto tipi (Oran / Tutar). */
	discType?: string | null;
	/** İskonto seviyesi (Belge detay iskonto / Belgealtı iskonto). */
	isForMaster?: string | null;
}

/**
 * Sipaeriş Detay Modeli
 */
export interface OrderDetailResultModel {
	/** Kayıt için benzersiz kimlik. */
	id?: number;
	/** Bağlı olduğu siparişin kimliği. */
	orderId?: number;
	/** Sipariş satır numarası. */
	lineNumber?: number | null;
	/** Detay kart tipi açıklaması. */
	detailCardType?: string | null;
	/** Kart kimliği. */
	cardId?: number | null;
	/** Manuel olarak girilen ürün/hizmet adı. */
	manuelName?: string | null;
	/** Birimin kodu. */
	unitCode?: string | null;
	/** Miktar. */
	qty?: number;
	/** Birim fiyat (KDV durumuna göre dahil veya hariç). */
	unitPriceTra?: number;
	/** KDV durumu (Dahil / Hariç). */
	vatStatus?: string | null;
	/** Tutar (KDV hariç). */
	amtTra?: number;
	/** KDV tutarı. */
	amtVatTra?: number;
	/** KDV oranı. */
	vatRate?: number;
	/** Net birim fiyat. */
	netUnitPriceTra?: number;
	/** Net tutar. */
	netAmtTra?: number;
	/** Birinci not alanı. */
	note1?: string | null;
	/** İkinci not alanı. */
	note2?: string | null;
	/** Kart kodu. */
	cardCode?: string | null;
	/** Kart adı. */
	cardName?: string | null;
	/** Masraf göstergesi (true: masraf kalemi, false: normal kalem). */
	chargeIndicator?: boolean;
	/** Tevkifat tutarı. */
	withholdingTaxAmtTra?: number;
	/** Tevkifat yüzdesi. */
	withholdingPercentage?: number;
	/** Tevkifat vergi tipi kodu. */
	witholdingTaxTypeCode?: string | null;
	/** Vergi muafiyet neden kodu. */
	taxExemptionReasonCode?: string | null;
	/** Portal sipariş durumu açıklaması. */
	portalOrderStatus?: string | null;
	/** Sevk edilen miktar. */
	qtyShipment?: number | null;
	/** Bağlı olduğu teklif detay kimliği. */
	offerDetailId?: number | null;
	/** Sipariş detayına ait iskonto ve arttırım kayıtlarının listesi. */
	allowanceCharges?: OrderAllowanceChargeResultModel[] | null;
}

/**
 * Sipariş Listesi Açıklama Modeli
 */
export interface OrderNoteResultModel {
	/** Kayıt için benzersiz kimlik. */
	id?: number;
	/** Sipariş kaydına ait benzersiz kimlik. */
	orderId?: number;
	/** Sipaiş açıklama. */
	note?: string | null;
}

/**
 * İlgili Tarihler için gelen fatura listesini veren parametre sınıfı
 */
export interface OrderResultListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Sipariş sorgusunda kullanılacak başlangıç tarihidir. Format: yyyy-MM-dd. */
	startDate?: string | null;
	/** Sipariş sorgusunda kullanılacak bitiş tarihidir. Format: yyyy-MM-dd. */
	endDate?: string | null;
	/** Sipariş türünü belirtir. Alabileceği değerler: Satış, Alış, Satış İade, Alış İade. */
	purchaseSales?: string | null;
	/** Belirli bir cari hesaba ait siparişleri filtrelemek için kullanılır. Boş bırakılması durumunda tüm kayıtlar listelenir. */
	accountCode?: string | null;
	/** Sipariş durumuna göre filtreleme yapılmasını sağlar. Alabileceği değerler: Açık, Kapalı, İptal. */
	orderStatus?: string | null;
}

/**
 * Sipaeriş Listesi Result Model
 */
export interface OrderResultModel {
	/** Kayıt için benzersiz kimlik. */
	id?: number;
	/** Belge numarası. */
	docNo?: string | null;
	/** Belge tarihi. */
	docDate?: string;
	/** İşlem tipi adı. */
	transactionName?: string | null;
	/** İşlem tipi kimliği. */
	transactionTypeId?: number;
	/** Satır uzatma tutarı (işlem para birimi). */
	lineExtensionAmtTra?: number;
	/** Vergisiz toplam tutar (işlem para birimi). */
	taxExclusiveAmtTra?: number;
	/** Vergili toplam tutar (işlem para birimi). */
	taxInclusiveAmtTra?: number;
	/** Toplam masraf tutarı (işlem para birimi). */
	chargeTotalAmtTra?: number;
	/** Yuvarlama farkı tutarı (işlem para birimi). */
	payableRoundingAmtTra?: number;
	/** Ödenecek toplam tutar (işlem para birimi). */
	payableAmtTra?: number;
	/** Para birimi kodu. */
	currencyCode?: string | null;
	/** Bağlı olduğu hesabın kimliği. */
	accountId?: number | null;
	/** Hesap kodu. */
	accountCode?: string | null;
	/** Hesap / firma adı. */
	accountName?: string | null;
	/** Hesap sahibinin adı. */
	accountFirstName?: string | null;
	/** Hesap sahibinin soyadı. */
	accountFamilyName?: string | null;
	/** Vergi kimlik numarası veya TC kimlik numarası. */
	accountVknTckn?: string | null;
	/** Vergi dairesi adı. */
	accountTaxOfficeName?: string | null;
	/** Ülke adı. */
	accountCountryName?: string | null;
	/** Şehir adı. */
	accountCityName?: string | null;
	/** Sokak / cadde adı. */
	accountStreetName?: string | null;
	/** İlçe / semt adı. */
	accountCitySubdvisionName?: string | null;
	/** Posta kutusu. */
	accountPostBox?: string | null;
	/** Daire / oda numarası. */
	accountRoom?: string | null;
	/** Posta kodu. */
	accountPostalCode?: string | null;
	/** Semt / mahalle adı. */
	accountDistrict?: string | null;
	/** Birinci telefon numarası. */
	accountTelephone1?: string | null;
	/** Birinci faks numarası. */
	accountFax1?: string | null;
	/** Birinci e-posta adresi. */
	accountEmail1?: string | null;
	/** Birinci cep telefonu numarası. */
	accountMobilePhone1?: string | null;
	/** Hesaba ait web sitesi adresi. */
	accountWebSiteUrl?: string | null;
	/** İnternet satış web sitesi adresi. */
	internetWebSiteUrl?: string | null;
	/** İnternet ödeme tipi açıklaması. */
	internetPaymentTypeName?: string | null;
	/** İnternet satış hesap adı. */
	internetAccountName?: string | null;
	/** İnternet ödeme tarihi. */
	internetPaymentDate?: string | null;
	/** Satış kanalı / mağaza tarafı açıklaması. */
	shopside?: string | null;
	/** Sipariş durumu. */
	portalOrderStatusEnumText?: string | null;
	/** Siparişe ait açıklama bilgilerinin listesi. */
	orderNotes?: OrderNoteResultModel[] | null;
	/** Siparişe ait detay satırlarının listesi. */
	orderDetails?: OrderDetailResultModel[] | null;
}

export interface OrderResultModelListResultModel {
	data?: OrderResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * EBelge sınıflarındaki PartyIdentifer alanlarında kullanılan özel etiket değerlerini içeren sınıftır.
 */
export interface PartyIdentifierModel {
	/** Müşteri no. MUSTERINO alanı için kullanılır */
	customerNo?: string | null;
	/** Bayi No. BAYINO alanı için kullanılır */
	retailerNo?: string | null;
	/** Abone No. ABONENO alanı için kullanılır */
	subscriberNo?: string | null;
	/** IDIS faturalarında sevkiyat no yu yazmak için kullanılır. SE- veya ES- ile başlayıp 7 hane rakam olacak şekilde toplam 10 hane olmalıdır. Örn: SE-0000123 veya ES-0000123 */
	shipmentNo?: string | null;
}

export interface Pasaport {
	no?: string | null;
	tarih?: string;
}

/**
 * Ödeme Listesi Sorgu Model
 */
export interface PaymentListRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Vade başlangıç tarihi alanıdır. */
	dueDateS?: string | null;
	/** Vade bitiş tarihi alanıdır. */
	dueDateE?: string | null;
	/** Cari kod başlangıç alanıdır. */
	accountCodeS?: string | null;
	/** Cari kod bitiş alanıdır. */
	accountCodeE?: string | null;
	/** Belge sınıfı adı (Kategori,Proje vs.).Birden fazla değer geçilebilir. */
	categoryName?: string | null;
}

/**
 * Ödeme Listesi Sorgu Sonuç Model
 */
export interface PaymentListResultModel {
	/** Cari tablosunun tekil alanıdır. */
	accountId?: number;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Cari Vkn/Tckn bilgisidir. */
	accountVknTckn?: string | null;
	/** Alacak,borç durum bilgisidir. */
	plusMinusEnumText?: string | null;
	/** Cari hareketin oluştuğu kaynak bilgisidir. */
	transactionSource?: string | null;
	/** İşlem tipinin kod bilgisidir. */
	transactionTypeCode?: string | null;
	/** İşlem tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** Belge sınıfı ad bilgisidir.(Kategori,Proje vs.) */
	categoryName?: string | null;
	/** Belge numarası bilgisidir. */
	docNo?: string | null;
	/** Belge tarihi bilgisidir. */
	docDate?: string;
	/** Vade tarihi bilgisidir. */
	dueDate?: string;
	/** Belge detay not bilgisidir. */
	note?: string | null;
	/** Para birimi kod bilgisidir. */
	currencyCode?: string | null;
	/** Firma para birimi cinsinden tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Firma para birimi cinsinden kalan tutar bilgisidir. decimal precision : number(18,2) */
	calcAmt?: number;
	/** Kalan gün sayısı bilgisidir. */
	lastDay?: number;
}

export interface PaymentListResultModelQueryResultList {
	data?: PaymentListResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

/**
 * Ödeme bilgileri
 */
export interface PaymentMeans {
	/** Ödeme tipi - (1-Ödeme tipi muhtelif,10-Nakit, 20-Çek,23-Banka Çeki, 42-Havale/EFT, 48-Kredi/Banka Kartı, ZZZ-Diğer) */
	paymentMeansCode?: string | null;
	/** Ödeme Kanalı */
	paymentChannelCode?: string | null;
	payeeFinancialAccount?: FinancialAccount;
	payerFinancialAccount?: FinancialAccount;
}

/**
 * Ödeme Bilgileri
 */
export interface PaymentMeansForDraft {
	/** Ödeme tipi - (1-Ödeme tipi muhtelif,10-Nakit, 20-Çek,23-Banka Çeki, 42-Havale/EFT, 48-Kredi/Banka Kartı, ZZZ-Diğer) */
	paymentMeansCode?: string | null;
	/** Ödeme Kanalı */
	paymentChannelCode?: string | null;
	/** Ödeme Tarihi */
	paymentDueDate?: string | null;
	/** IBAN */
	iban?: string | null;
	/** Para Birimi */
	currencyCode?: string | null;
	/** Açıklama */
	note?: string | null;
}

/**
 * Kişi bilgileri
 */
export interface PersonInfoModel {
	/** Adı */
	firstName?: string | null;
	/** Soyadı */
	familyName?: string | null;
	/** Unvanı */
	title?: string | null;
	/** İkinci Adı */
	middleName?: string | null;
	/** İsim son eki */
	nameSuffix?: string | null;
	/** Pasaport Numarası */
	passportNo?: string | null;
	/** Veriliş Tarihi */
	passportStartDate?: string;
	/** Uyruğu */
	nationalityId?: string | null;
}

/**
 * Fiyat Listesi Müşteri/Tedarikçi İlişkisi Modeli
 */
export interface PriceListAccountRelModel {
	/** Fiyat Listesi ve Müşteri/Tedarikçi İlişkisinin eklenmesi istenen Fiyat Listesi Kod bilgisidir. */
	priceListCode: string;
	/** Fiyat Listesi ve Müşteri/Tedarikçi İlişkisinin eklenmesi istenen Müşteri/Tedarikçi Kod bilgisidir. */
	accountCode: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
}

/**
 * Fiyat Listesi Account İlişki Modeli
 */
export interface PriceListAccountRelResultModel {
	/** Fiyat listesi Idsi */
	priceListId: number;
	/** accountName */
	accountName?: string | null;
	/** accountCode */
	accountCode?: string | null;
	/** accountVknTckn */
	accountVknTckn?: string | null;
	/** accountCategory1Name */
	accountCategory1Name?: string | null;
	/** accountCategory2Name */
	accountCategory2Name?: string | null;
	/** accountCategory3Name */
	accountCategory3Name?: string | null;
}

/**
 * Fiyat Listesi Detay Modeli
 */
export interface PriceListDetailModel {
	/** Fiyat listesi detayında yer alan mal/ hizmet tipi bilgisidir. String (Enum) ("1: Stok", "2: Gelir", "3: Gider", "4: Demirbaş") */
	detailCardType: number;
	/** Fiyat listesi detayında yer alan mal/ hizmet kodu bilgisidir. */
	productCode: string;
	/** Fiyat listesi detayında yer alan birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPriceTra: number;
	/** Para birimi kod bilgisidir. */
	currencyCode: string;
	/** Döviz kuru bilgisidir. decimal precision : number(18,6) */
	currencyRate: number;
	/** Fiyat listesi detayında yer alan KDV durum bilgisidir. "1: Dahil" veya "2: Hariç" değerini alabilmektedir. */
	vatStatus: number;
	/** Fiyat Listesi detayının geçerli olacağı başlangıç tarihi bilgisidir. */
	startDate: string;
	/** Fiyat Listesi detayının geçerli olacağı bitiş tarihi bilgisidir. */
	endDate: string;
	/** Fiyat Listesi detayında yer alan minimum birim fiyat bilgisidir. Alış/ Satış işlemlerinde yetkiye bağlı olarak girilebilecek en düşük fiyat bilgisini belirtir. decimal precision : number(18,6) */
	minUnitPriceTra?: number;
	/** Birim kodu bilgisidir. */
	unitCode: string;
}

/**
 * Fiyat Listesi Detay Modeli
 */
export interface PriceListDetailResultModel {
	/** Fiyat listesi detayında yer alan mal/ hizmet tipi bilgisidir. String (Enum) ("1: Stok", "2: Gelir", "3: Gider", "4: Demirbaş") */
	detailCardType: number;
	/** Detay kart tipi açıklama metni alanıdır */
	detailCardTypeEnumText?: string | null;
	/** Ürün kimlik numarası alanıdır */
	productId: number;
	/** Ürün adı alanıdır */
	productName?: string | null;
	/** Fiyat listesi detayında yer alan mal/ hizmet kodu bilgisidir. */
	productCode?: string | null;
	/** Fiyat listesi detayında yer alan birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPriceTra: number;
	/** Para birimi adı alanıdır */
	currencyCode?: string | null;
	/** Vergi durumunun açıklama metni alanıdır */
	vatStatusEnumText?: string | null;
	/** Fiyat Listesi detayının geçerli olacağı başlangıç tarihi bilgisidir. */
	startDate: string;
	/** Fiyat Listesi detayının geçerli olacağı bitiş tarihi bilgisidir. */
	endDate: string;
	/** Fiyat Listesi detayında yer alan minimum birim fiyat bilgisidir. Alış/ Satış işlemlerinde yetkiye bağlı olarak girilebilecek en düşük fiyat bilgisini belirtir. decimal precision : number(18,6) */
	minUnitPriceTra?: number;
	/** Birim kodu alanıdır */
	unitCode?: string | null;
	/** Birim adı alanıdır */
	unitName?: string | null;
	/** Fiyat Listesi Kimlik Numarasıdır */
	priceListId: number;
}

/**
 * Fiyat Listesi Modeli
 */
export interface PriceListModel {
	/** Fiyat listesi kodu bilgisidir. */
	priceListCode: string;
	/** Fiyat listesi adı bilgisidir. */
	priceListName: string;
	/** Fiyat listesi işlem tipi bilgisidir. String (Enum) ("1: Alış", "2: Satış") */
	purchaseSales: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
	/** Kaydın pasif bilgisidir. String(Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
	/** Fiyat listesi içerisindeki mal veya hizmet bilgileri alanıdır. Bir veya birden fazla detay olacak şekilde girilebilir. */
	priceListDetail: PriceListDetailModel[];
}

/**
 * Fiyat Listesi Modeli
 */
export interface PriceListResultModel {
	/** Fiyat listesi kodu bilgisidir. */
	priceListCode: string;
	/** Fiyat listesi adı bilgisidir. */
	priceListName: string;
	/** Fiyat listesi işlem tipi bilgisidir. String (Enum) ("1: Alış", "2: Satış") */
	purchaseSales: number;
	/** Alış / satış tipinin açıklama metni alanıdır */
	purchaseSalesEnumText?: string | null;
	/** Fiyat listesi içerisindeki mal veya hizmet bilgileri alanıdır. Bir veya birden fazla detay olacak şekilde girilebilir. */
	priceListDetail: PriceListDetailResultModel[];
	/** Fiyat listesi içerisindeki mal veya hizmet bilgileri alanıdır. Bir veya birden fazla detay olacak şekilde girilebilir. */
	priceListAccountRel: PriceListAccountRelResultModel[];
}

export interface PriceListResultModelListResultModel {
	data?: PriceListResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Mysoft ürün bilgileri
 */
export interface ProductActivationProductTypeRelModel {
	/** Aktivasyon Ürünü */
	activationProductTypeEnumText?: string | null;
}

/**
 * Stok Barkod Modeli
 */
export interface ProductBarcodeModel {
	/** Barkod numarası bilgisidir. */
	barcodeNo: string;
	/** Üzerinde ilgili barkod numarası olan stokların miktar bilgisidir. */
	quantity: number;
	/** Birim kodu bilgisidir. */
	unitCode: string;
	/** Barkodun eklenmesi istenen stoğun kod bilgisidir. */
	productCode: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
}

/**
 * ProductBaseModel
 */
export interface ProductBaseModel {
	/** Stok tekil anahtarı */
	id: number;
	/** Stok Tipi alanıdır Sadece 3 değer alabilir. ("Stok", "Gelir", "Gider") */
	productType: string;
	/** Stok kodu bilgisidir. */
	productCode: string;
	/** Stok adı bilgisidir. */
	productName: string;
}

/**
 * ProductBaseModelForOutbox
 */
export interface ProductBaseModelForOutbox {
	/** Stok kodu bilgisidir. */
	productCode: string;
	/** Stok adı bilgisidir. */
	productName: string;
	/** Seri No Bilgisi */
	serialIdList?: string[] | null;
}

/**
 * Stok Marka Modeli
 */
export interface ProductBrandModel {
	/** Marka kodu bilgisidir. */
	brandCode: string;
	/** Marka adı bilgisidir. */
	brandName: string;
	/** Marka tanımının HEX renk kodu bilgisidir.İlgili markanın kullanıldığı süreçlerde marka bilgisinin renkli gösterilmesini sağlar. Örnek: #D33A22, #2254D3 vb. 6 haneli kodlardır. Boş gönderilmesi halinde #1D861D olarak kabul edilir. */
	color?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
	/** Kaydın pasif bilgisidir. String(Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
}

/**
 * Depo için Stok bilgisi
 */
export interface ProductForWarehouseModel {
	/** Stok Id */
	id?: number;
	/** Stok Kodu */
	productCode?: string | null;
	/** Stok Adı */
	productName?: string | null;
	/** Depo stok miktarı */
	qtyPrm?: number;
	/** Taslak satış fatura miktarı */
	draftSalesInvoiceQtyPrm?: number | null;
	/** Birim Id */
	unitId?: number;
	/** Birim Kodu */
	unitCode?: string | null;
}

/**
 * Stok bilgisini tutar
 */
export interface ProductModel {
	/** Stok tekil anahtarı */
	id: number;
	/** Stok Tipi alanıdır Sadece 3 değer alabilir. ("Stok", "Gelir", "Gider") */
	productType: string;
	/** Stok kodu bilgisidir. */
	productCode: string;
	/** Stok adı bilgisidir. */
	productName: string;
	/** Birim kodu bilgisidir. */
	unitCode: string;
	/** Barkod alanıdır */
	barcode?: string | null;
	/** Liste satış fiyat bilgisidir. */
	activeSellingPrice?: number;
	/** Satış fiyat para birimi kod bilgisidir. */
	salesCurrencyCode?: string | null;
	/** Alış fiyat para birimi kod bilgisidir. */
	purchaseCurrencyCode?: string | null;
	/** Alış birim fiyat bilgisidir. decimal precision : number(18,5) */
	purchaseUnitPriceTra?: number;
	/** Alış KDV oran bilgisidir. decimal precision : number(18,5) */
	purchaseVatRate?: number;
	/** Alış KDV Dahil Hariç bilgisi ("DAHIL", "HARIC") */
	purchaseVatStatus?: string | null;
	/** Satış KDV oran bilgisidir. decimal precision : number(18,5) */
	salesVatRate?: number;
	/** Satış KDV Dahil Hariç bilgisi ("DAHIL", "HARIC") */
	salesVatStatus?: string | null;
	/** GTİP numara bilgisidir. */
	gtipCode?: string | null;
	/** ÖTV oran bilgisidir. */
	otvRate?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Stok adı 2 bilgisidir. */
	productName2?: string | null;
	/** Muafiyet Kodu bilgisidir. */
	taxExemptionReasonCode?: string | null;
	/** Grup Seviyesi 1 Kategori Kodu bilgisidir.. */
	category1Code?: string | null;
	/** Grup Seviyesi 1 Kategori bilgisidir. */
	category1Name?: string | null;
	/** Grup Seviyesi 2 Kategori Kodu bilgisidir.. */
	category2Code?: string | null;
	/** Grup Seviyesi 2 Kategori bilgisidir. */
	category2Name?: string | null;
	/** Grup Seviyesi 3 Kategori Kodu bilgisidir.. */
	category3Code?: string | null;
	/** Grup Seviyesi 3 Kategori bilgisidir. */
	category3Name?: string | null;
	/** Grup Seviyesi 4 Kategori Kodu bilgisidir.. */
	category4Code?: string | null;
	/** Grup Seviyesi 4 Kategori bilgisidir. */
	category4Name?: string | null;
	/** Grup Seviyesi 5 Kategori Kodu bilgisidir.. */
	category5Code?: string | null;
	/** Grup Seviyesi 5 Kategori bilgisidir. */
	category5Name?: string | null;
	/** Stoğun markasına ait kod bilgisidir. */
	brandCode?: string | null;
	/** Stoğun tedarik edildiği firma bilgisidir.Mysoft portal üzerinde tanımlı olan cari hesabın kod değeri gönderilir. */
	supplierAccountCode?: string | null;
	/** Kaydın stok kod ile kontrol edilip edilmeyeceği bilgisidir. String (Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isCheckWithProductCode?: string | null;
	/** Stok ile ilişkili depoların bilgisi */
	warehouseList?: WarehouseApiRelModel[] | null;
	/** Kaydın Pasif bilgisidir. String (Enum) ("EVET", "HAYIR") (Varsayılan: HAYIR) */
	isPassive?: string | null;
}

export interface ProductModelListResultModel {
	data?: ProductModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Stok listeleme filtre sınıfı
 */
export interface ProductRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Stok kodu filtresi, Eşit olarak bakılır. */
	productCode?: string | null;
	/** Stok adı filtresi, Başlayan olarak bakılır. */
	productName?: string | null;
	/** Barkod filtresi, Eşit olarak bakılır */
	barcode?: string | null;
	/** Bu alan yazılan değer, productCode,productName ve barcode alanlarında like ile aranır. */
	codeNameBarcodeFullTextSearch?: string | null;
}

/**
 * Stok hareketi detay (satır) modeli
 */
export interface ProductTransactionDetailResultModel {
	/** Detay satırının benzersiz Id değeridir. */
	id?: number;
	/** İlgili master kaydının kimliği (üst kayıtla ilişkilendirme). */
	productTransactionId?: number;
	/** Satır sıra numarasıdır (1, 2, 3...). */
	lineNumber?: number;
	/** Ürün/Stok kodudur. */
	productCode?: string | null;
	/** Ürün/Stok adıdır. */
	productName?: string | null;
	/** Ölçü birimi kodudur. */
	unitCode?: string | null;
	/** Hareket miktarıdır. */
	qty?: number;
	/** Ürünün takip birimi üzerinden miktar karşılığıdır. */
	qtyPrm?: number;
	/** Birim fiyat (Belge Para Birimi). */
	unitPrice?: number;
	/** Birim fiyat (TRY cinsinden). */
	unitPriceTra?: number;
	/** Satır tutarı (Belge Para Birimi). */
	amt?: number;
	/** Satır tutarı (TRY). */
	amtTra?: number;
	/** Satır iskonto/indirim tutarı (Belge Para Birimi). */
	allowanceTotalAmt?: number;
	/** Satır iskonto/indirim tutarı (TRY). */
	allowanceTotalAmtTra?: number;
	/** Satır masraf/ilave ücret tutarı (Belge Para Birimi). */
	chargeTotalAmt?: number;
	/** Satır masraf/ilave ücret tutarı (TRY). */
	chargeTotalAmtTra?: number;
	/** Giriş/çıkış göstergesidir. +1: Giriş, -1: Çıkış. */
	plusMinus?: number;
	/** Maliyet Tutarı */
	amtCost?: number;
	/** Transfer hareket mi? */
	isTransfer?: boolean;
	/** Lot/parti kodudur. Lot takibi yapılmıyorsa boş döner. */
	productLotCode?: string | null;
	/** Lot/parti adıdır. Lot takibi yapılmıyorsa boş döner. */
	productLotName?: string | null;
	/** Satır notudur. */
	note?: string | null;
}

/**
 * Stok hareketi liste sorgu modeli
 */
export interface ProductTransactionRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge tarihi başlangıç alanıdır. Format: MM/dd/yyyy HH:mm:ss */
	docDateStart: string;
	/** Belge tarihi bitiş alanıdır. Format: MM/dd/yyyy HH:mm:ss */
	docDateEnd: string;
	/** Belge numarası filtresidir. Eşit olarak bakılır. */
	docNo?: string | null;
	/** Depo kodu filtresidir. Eşit olarak bakılır. */
	warehouseCode?: string | null;
	/** İşlem tipi filtresidir. Verilen değerlerden herhangi biri belirtebilirsiniz:
 SATIŞ, İHRACAT, SATIŞ İADE, ALIŞ, İTHALAT, ALIŞ İADE, GİRİŞ, ÇIKIŞ, TRANSFER, DEVİR, 
 PROFORMA SATIŞ, PROFORMA ALIŞ, TEVKİFATLI SATIŞ, İHRAÇ KAYITLI SATIŞ, TEVKİFAT SATIŞ İADE, 
 İHRAÇ KAYITLI SATIŞ İADE, TEVKİFAT ALIŞ, İHRAÇ KAYITLI ALIŞ, TEVKİFAT ALIŞ İADE, 
 İHRAÇ KAYITLI ALIŞ İADE, SMM ALIŞ, SMM SATIŞ, SMM TEVKİFATLI SATIŞ, ALIŞ MÜSTAHSİL, 
 GİDER PUSULASI, GİDER PUSULASI SATIŞ İADE */
	transactionTypeName?: string | null;
}

/**
 * Stok hareketi API yanıt modeli (Envelope)
 */
export interface ProductTransactionResponseModel {
	/** Stok hareketi master kayıtları listesi */
	data?: ProductTransactionResultModel[] | null;
	/** İşlemin başarılı olup olmadığını belirtir. */
	succeed?: boolean;
	/** Açıklama mesajı (varsa). */
	message?: string | null;
	/** Hata kodu (varsa). */
	errorCode?: string | null;
	/** Bir sonraki sayfalama için kullanılacak değerdir (dönen son master kaydın id değeri). */
	afterValue?: number;
}

/**
 * Stok hareketi master (ana) kayıt modeli
 */
export interface ProductTransactionResultModel {
	/** Stok hareket kaydının benzersiz Id değeridir. */
	id?: number;
	/** İşlem tipi adıdır. */
	transactionTypeName?: string | null;
	/** Belge tarihidir. Format: MM/dd/yyyy HH:mm:ss */
	docDate?: string | null;
	/** Belge numarasıdır. */
	docNo?: string | null;
	/** TRY cinsinden tutardır. */
	amt?: number;
	/** Belge tutarıdır (orijinal döviz cinsinden). */
	amtTra?: number;
	/** Hareketin yapıldığı deponun kodudur. */
	warehouseCode?: string | null;
	/** Hareketin yapıldığı deponun adıdır. */
	warehouseName?: string | null;
	/** Transfer hareketlerinde karşı deponun kodudur. Transfer değilse boş döner. */
	otherWarehouseCode?: string | null;
	/** Transfer hareketlerinde karşı deponun adıdır. Transfer değilse boş döner. */
	otherWarehouseName?: string | null;
	/** İlgili müşteri/tedarikçi kodudur. */
	accountCode?: string | null;
	/** İlgili müşteri/tedarikçi adıdır. */
	accountName?: string | null;
	/** Para birimi kodudur. */
	currencyCode?: string | null;
	/** Para birimi kurudur. */
	currencyRate?: number;
	/** Kategori adıdır. */
	categoryName?: string | null;
	/** Hareket açıklamasıdır. */
	note?: string | null;
	/** Hareketin kaynak modül bilgisidir. (FATURA, İRSALİYE vb.) */
	transactionSourceEnumText?: string | null;
	/** Stok hareketi detay (satır) kayıtları */
	productTransactionDetail?: ProductTransactionDetailResultModel[] | null;
}

/**
 * Stok Birim Modeli
 */
export interface ProductUnitModel {
	/** Birim kodu bilgisidir. */
	unitCode: string;
	/** Takip birim katsayı bilgisidir. Örnek: Stok tanımındaki birim "Adet" seçildiğinde ve çevrim birimi olarak "Kutu" eklenmek istendiğinde, sağlanması gereken 1 Kutu=10 Adet eşitliğinde yer alan 10 sayısı takip birim katsayıyı ifade eder. decimal precision : number(18,6) */
	rate: number;
	/** Çevrim birim katsayı bilgisidir. Örnek: Stok tanımındaki birim "Adet" seçildiğinde ve çevrim birimi olarak "Kutu" eklenmek istendiğinde, sağlanması gereken 1 Kutu=10 Adet eşitliğinde yer alan 1 rakamı çevrim birim katsayıyı ifade eder. decimal precision : number(18,6) */
	rate2: number;
	/** Birim çevrimi sıra no bilgisidir. */
	orderNumber: number;
	/** Barkodun eklenmesi istenen stoğun kod bilgisidir. */
	productCode: string;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. */
	tenantIdentifierNumber: string;
}

/**
 * Depo Stok Bilgisi
 */
export interface ProductWarehouseModel {
	/** Depo Id */
	warehouseId?: number;
	/** Depo Kodu */
	warehouseCode?: string | null;
	/** Depo Adı */
	warehouseName?: string | null;
	/** Stok Listesi */
	productList?: ProductForWarehouseModel[] | null;
}

export interface ProductWarehouseModelListResultModel {
	data?: ProductWarehouseModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İrsaliye yanıtını UBL XML şeklinde göndermek için kullanılan sınıf
 */
export interface ReceiptForUblXmlDraftModel {
	/** irsaliye yanıtının ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	receiptAdviceTypeUblString?: string | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İrsaliye yanıtını UBL XML şeklinde göndermek için kullanılan sınıf
 */
export interface ReceiptForUblXmlModel {
	/** irsaliye yanıtının ubl xml string halidir. Buraya gönderilen değer xmlin ziplenip base64 stringe çevrilmiş halidir. */
	receiptAdviceTypeUblString?: string | null;
	/** Posta Kutusu alanıdır */
	pkAlias?: string | null;
	/** Gönderici Birim alanıdır */
	gbAlias?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan irsaliye yanıtı dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Faturanın gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

/**
 * İrsaliye yanıtını UBL XML şeklinde göndermek için kullanılan sınıf
 */
export interface ReceiptForUblXmlTepeBilisimModel {
	/** İrsaliye yanıtının Tepe Bilişime özel yapıdaki XML halidir. */
	xml?: string | null;
	/** İrsaliye yanıtının gözükmesi istenilen xslt adı. Portalda ilgili müşteri için tanımlanmış olan xsltlerden birinin adı geçilmelidir. Boş bırakılırsa varsayılan olan kullanılacaktır. */
	xsltName?: string | null;
	/** Portal tarafında tanımlanan dizayn set kodudur. Bu alan doldurulduğunda, ilgili dizayn set tanımında kullanılan, e-fatura,e-arşiv, e-arşiv internet satış, e-irsaliye dizaynları kullanılacaktır. */
	xsltSetCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Seri Ön Ek alanıdır */
	prefix?: string | null;
}

/**
 * İrsaliye yanıt başlık bilgileri
 */
export interface ReceiptHeaderInfoModel {
	/** İrsaliye yanıt id */
	id?: number;
	/** İrsaliye yanıtın evrensel tekil tanımlama numarasıdır. */
	ettn?: string | null;
	/** Yanıt durum açıklaması */
	receiptStatusText?: string | null;
	/** İrsaliye yanıt numarası bilgisidir. */
	docNo?: string | null;
	/** İrsaliye yanıt belge tarihi bilgisidir. */
	docDate?: string;
	/** İrsaliye belge no */
	despatchDocNo?: string | null;
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye belge tarih */
	despatchDocDate?: string;
	/** Posta kutusu bilgisidir. */
	pkAlias?: string | null;
	/** Gönderici birim adresi */
	gbAlias?: string | null;
	/** Belgenin sistemde oluşturulma zamanıdır */
	createDate?: string | null;
}

export interface ReceiptHeaderInfoModelListResultModel {
	data?: ReceiptHeaderInfoModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gelen irsaliye yanıtının zarf bilgilerini tutan sınıf
 */
export interface ReceiptInboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** İrsaliye UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	despatchAdviceTypeStrAsZip?: string | null;
}

export interface ReceiptInboxEnvelopeInfoResponseResultModel {
	data?: ReceiptInboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Gelen İrsaliye Yanıtı ETTN Model
 */
export interface ReceiptInboxEttnResultModel {
	/** Kaydın MYSOFT tarafındaki Id'si */
	id?: number;
	/** İrsaliye ETTN */
	despatchETTN?: string | null;
	/** İrsaliye Yanıtı ETTN */
	receiptETTN?: string | null;
}

export interface ReceiptInboxEttnResultModelListResultModel {
	data?: ReceiptInboxEttnResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İrsaliye Yanıt Detayı
 */
export interface ReceiptOutboxDetailModel {
	/** Satır Numarası */
	lineNumber?: number;
	/** Teslim alınan miktar bilgisidir. */
	receivedQuantity?: number;
	/** Fazla miktar bilgisidir */
	oversupplyQuantity?: number;
	/** Reddedilen miktar bilgisidir */
	rejectedQuantity?: number;
	/** Eksik miktar bilgisidir */
	shortQuantity?: number;
	/** Red nedeni bilgisidir */
	rejectReason?: string | null;
	/** Mal veya hizmet adı bilgisidir. */
	itemName?: string | null;
	/** Birim kodu bilgisidir. ISO birim kodu yazılmalıdır.Adet için örn: 'C62' gönderilmesi gerekmektedir. */
	unitIsoCode?: string | null;
}

/**
 * Giden irsaliye yanıtı zarf bilgilerini tutan sınıf
 */
export interface ReceiptOutboxEnvelopeInfoResponse {
	/** Zarf ETTN */
	envelopeIdentifier?: string | null;
	/** Zarf Durum Kodu */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusDesc?: string | null;
	/** Gönderici Vkn/Tckn */
	senderID?: string | null;
	/** Alıcı Vkn/Tckn */
	receiverID?: string | null;
	/** Gönderici Etiketi (Gönderici Birimi) */
	senderAlias?: string | null;
	/** Alıcı Etiketi (Alıcı Posta Kutusu) */
	receiverAlias?: string | null;
	/** Zarfın ilk oluşturulma zamanı */
	envelopeDate?: string | null;
	/** Zarfın Mysoft sistemlerinde oluşturulma zamanı */
	envelopeCreateDate?: string | null;
	/** İrsaliye UBL XML'inin ziplenmiş ve base64 stringe çevrilmiş halini tutar */
	despatchAdviceTypeStrAsZip?: string | null;
}

export interface ReceiptOutboxEnvelopeInfoResponseResultModel {
	data?: ReceiptOutboxEnvelopeInfoResponse;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden İrsaliye Yanıtı
 */
export interface ReceiptOutboxModel {
	/** Yanıt verilen gelen irsaliyenin evrensel tekil numarasıdır. */
	despatchEttn?: string | null;
	/** İrsaliye yanıtın evrensel tekil tanımlama numarasıdır.
 İrsaliyeyi yanıtı ilk gönderimde bu alanı boş geçebilirsiniz veya kendiniz bu alanı gönderebilirsiniz. */
	ettn?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
	/** İrsaliye yanıt numarası bilgisidir.Boş gönderilmesi durumunda,eğer prefix değeri dolu ise girilen ön ek değeri ile,
 boş ise varsayılan ön ek değeriniz üzerinden irsaliye numarası atanır.
 Örnek:YNT2019000001220, 3 hane ön ek, 4 hane yıl bilgisi, 9 irsaliye yanıt numarası olacak şekilde 16 haneli olur. */
	docNo?: string | null;
	/** İrsaliye yanıt belge tarihi bilgisidir. */
	docDate?: string;
	/** İrsaliye yanıt belge zamanı bilgisidir. */
	docTime?: string;
	/** Teslimat tarihi bilgisidir. */
	actualDeliveryDate?: string;
	/** Teslimat zamanı bilgisidir. */
	actualDeliveryTime?: string;
	/** İrsaliye yanıt açıklama bilgisidir. */
	note?: string | null;
	/** İrsaliye yanıt tipi string(Enum) "SEVK", "MATBUDAN" */
	receiptAdviceTypeCode?: string | null;
	/** İrsaliye yanıt numarası ön ek bilgisidir.Örn:YNT sistem tarafından irsaliye yanıt numarası veriyorsa ve sistem üzerinde
 birden fazla ön ek değeriniz bulunuyor ise, bu alana tercih ettiğiniz bir ön ek koyabilirsiniz.
 Boş gönderilmesi durumunda varsayılan olarak belirlenen ön ek üzerinden irsaliye yanıt numarası atanır. */
	prefix?: string | null;
	/** Eğer seçilen, yada varsayılan olarak bulunan irsaliye yanıtı dizaynı onaylı değilse, genel dizayn ile gönderim yapılıp yapılmayacağını belirler. Bu parametreye true geçilirse, Onaylı dizayn bulunamadığında genel dizayndan gönderim yapılır. Diğer türlü sistem hata verir ve fatura gönderimi yapılmaz. */
	isSendWithGeneralXsltIfDefaultNotExists?: boolean | null;
	/** Özel oluşturulmış irsaliye yanıt görünümünüz var ise, bu irsaliye yanıt görünümünü kullanmak için, size verilen xsltCode bilgisini bu alan ile göndermelisiniz. 
 Eğer boş gönderirseniz, öncelikle size ait olan varsayılan bir görünüm varmı diye bakılır.Eğer var ise, bu kullanılır, yok ise GİB'in standart dizaynı kullanılarak irsaliye yanıtı gönderilir. */
	xsltName?: string | null;
	/** Müşteri posta kutusu bilgisidir.Eğer alan boş bırakılır ve gönderilen belge E-irsaliye ise, posta kutusu otomatik atanır. */
	pkAlias?: string | null;
	/** Gönderim yapmak istediğiniz alias bilgisidir.Eğer birden fazla bulunuyor ise,gönderim yapmak istediğiniz alias bilgisi girilir,
 boş bırakılması durumunda firmanız varsayılan gönderici birim alias bilgisi atanır. */
	gbAlias?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** İlgili kaydı şema şematron kontrolünden geçirmez. Eğer oluşturulan fatura çok standart ise, serviste performans kazanmak için bu parametre true geçilebilir. */
	isNotControlSchemaSchematron?: boolean;
	/** Gönderilen faturanın üzerine yazılacak, kaynak sistemlerde tekil olan referans numarası. Bu alan, faturanın oluştuğu kaynak sistemdeki tekil numaranın takibi için kullanılabilir. */
	referanceKey?: string | null;
	/** İrsaliye yanıt detayları */
	detailList?: ReceiptOutboxDetailModel[] | null;
}

/**
 * İrsaliye yanıtı Sonuç sınıfı
 */
export interface ReceiptOutboxResultModel {
	/** İrsaliye Yanıt ETTN */
	receiptETTN?: string | null;
	/** İrsaliye Yanıt Belge Numarası */
	docNo?: string | null;
}

export interface ReceiptOutboxResultModelResultModel {
	data?: ReceiptOutboxResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Hatalı kayıt bilgisi
 */
export interface ReceiptOutboxResultTepeBilisimFailedModel {
	/** İrsaliye Yanıt ETTN */
	receiptETTN?: string | null;
	/** İrsaliye Yanıt Belge Numarası */
	docNo?: string | null;
	/** Hata açıklaması */
	errorMessage?: string | null;
}

/**
 * İrsaliye yanıt dönüş bilgisi
 */
export interface ReceiptOutboxResultTepeBilisimModel {
	/** İşlem gören irsaliye yanıt bilgileri */
	tepeResult?: ReceiptOutboxResultModel[] | null;
	/** İşlem gören irsaliye yanıt bilgileri */
	failedTepeResult?: ReceiptOutboxResultTepeBilisimFailedModel[] | null;
}

export interface ReceiptOutboxResultTepeBilisimModelResultModel {
	data?: ReceiptOutboxResultTepeBilisimModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Giden İrsaliye Yanıt Durum Sınıfı
 */
export interface ReceiptOutboxStatusResultModel {
	/** Giden İrsaliye Yanıt Id */
	id?: number;
	/** İrsaliye Yanıt ETTN */
	receiptETTN?: string | null;
	/** İrsaliye Yanıt Numarası */
	docNo?: string | null;
	/** İrsaliye Yanıt Durumları (BOS,GIBE_GONDERILECEK,GIBE_GONDERILDI,ALICIYA_ULASTI,ISLENDI,HATA) */
	despatchStatusText?: string | null;
	/** Zarf Durum Kodu. GİB'in zarf durum kodlarıdır. */
	envelopeStatusCode?: number;
	/** Zarf Durum Açıklaması */
	envelopeStatusText?: string | null;
	/** Hatalı zarfların tekrar gönderim deneme sayısı */
	tryCount?: number;
}

export interface ReceiptOutboxStatusResultModelListResultModel {
	data?: ReceiptOutboxStatusResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface ReceiptOutboxStatusResultModelResultModel {
	data?: ReceiptOutboxStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * İade fatura bilgisi
 */
export interface ReturnInvoiceRefInfo {
	/** İade fatura no bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceNo?: string | null;
	/** İade fatura tarihi bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefInvoiceDate?: string;
	/** İade fatura açıklama bilgisidir.(invoiceType ="IADE" veya "TEVKIFATIADE" olmalıdır.) */
	billingRefNote?: string | null;
}

export type SGKIlaveFaturaTipi = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SGKOzelFaturaAlanlari {
	ilaveFaturaTipi?: SGKIlaveFaturaTipi;
	mukellefKodu?: string | null;
	mukellefAdi?: string | null;
	dosyaNo?: string | null;
	faturaDonemi?: FaturaDonemi;
}

export interface Sahis {
	ad?: string | null;
	soyad?: string | null;
	unvan?: string | null;
	uyruk?: string | null;
	bankaHesap?: BankaHesap;
	pasaport?: Pasaport;
}

export interface SaticiTedarikcisi {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
}

/**
 * Taslak irsaliye GİB'e gönderim parametreleri
 */
export interface SendDraftDespatchRequestModel {
	/** İrsaliye ETTN */
	ettn?: string | null;
	/** Belge numarası ön eki */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-fatura,e-arşiv, ve e-arşiv internet satış numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

/**
 * Taslak faturayı GİB'e gönderim parametreleri
 */
export interface SendDraftInvoiceRequestModel {
	/** Fatura ETTN */
	ettn?: string | null;
	/** Belge numarası ön eki */
	prefix?: string | null;
	/** Portal tarafında tanımlanan numaratör set kodudur. Bu alan doldurulduğunda, ilgili set tanımında kullanılan, e-fatura,e-arşiv, ve e-arşiv internet satış numaratörleri kullanılacaktır. Prefix alanı doldurulsa bile kullanılmaz. */
	numeratorSetCode?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge gönderimini sağlayan aracı firmayı tanımlayan unique değerdir.Mysoft sistemlerine entegrasyon yapan firmaların bu bilgiyi,iş ortaklığı birim yöneticisinden alması gerekir. */
	connectorGuid?: string | null;
}

export interface SevkIrsaliye {
	no?: string | null;
	tarih?: string;
	ettn?: string | null;
}

/**
 * Sevk bilgileri
 */
export interface Shipment {
	/** Kargo Numarası */
	cargoNo?: string | null;
	/** Kab Numarası */
	packageNumber?: string | null;
	/** Kab Cinsi */
	packageType?: string | null;
	/** Kab Adeti */
	packageQty?: number;
	/** Kabın markası */
	packageBrand?: string | null;
	/** Net Miktar */
	netQty?: number;
	/** Bürüt Miktar */
	crossQty?: number;
	/** Menşei Ülke Kodu */
	originCountryCode?: string | null;
	/** Menşei Ülke Adı */
	originCountryName?: string | null;
}

/**
 * Personel Index Model
 */
export interface StaffIndexModel {
	/** Personel tablosunun tekil anahtarıdır. */
	id?: number;
	/** Personelin sicil numarası bilgisidir. */
	accountCode?: string | null;
	/** Personelin ad-soyad bilgisidir. */
	accountName?: string | null;
	/** Personelin TCKN bilgisidir. string türündedir ama integer ifade girilmelidir */
	identifierNumber?: string | null;
	/** Personel görev bilgisidir. */
	jobTitle?: string | null;
	/** Telefon numarası bilgisidir. */
	telephone1?: string | null;
	/** E-Posta bilgisidir */
	email1?: string | null;
	/** Fax numarası bilgisidir. */
	fax1?: string | null;
	/** Şehir kodu bilgisidir. */
	cityCode?: string | null;
	/** Şehir adı bilgisidir. */
	cityName?: string | null;
	/** Ülke kodu bilgisidir. */
	countryCode?: string | null;
	/** Ülke adı bilgisidir. */
	countryName?: string | null;
	/** Cep telefonu numarası bilgisidir. */
	mobilePhone1?: string | null;
	/** Posta kodu */
	postalCode?: string | null;
	/** Kapı no */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina adı */
	buildingName?: string | null;
	/** Bina no */
	buildingNumber?: string | null;
	/** İlçe */
	citySubdivision?: string | null;
	/** Kasaba veya köy */
	region?: string | null;
	/** Mahalle */
	district?: string | null;
	/** Web sitesi */
	webSiteUrl?: string | null;
	/** Kategori adı bilgisidir. */
	categoryName?: string | null;
}

export interface StaffIndexModelListResultModel {
	data?: StaffIndexModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Personel Model
 */
export interface StaffModel {
	/** Personel tablosunun tekil anahtarıdır. */
	id: number;
	/** Personelin sicil numarası bilgisidir. */
	accountCode?: string | null;
	/** Personelin ad-soyad bilgisidir. */
	accountName: string;
	/** Personelin TCKN bilgisidir. string türündedir ama integer ifade girilmelidir */
	identifierNumber: string;
	/** Personel görev bilgisidir. */
	jobTitle?: string | null;
	/** Telefon numarası bilgisidir. */
	telephone1?: string | null;
	/** E-Posta bilgisidir */
	email1?: string | null;
	/** Fax numarası bilgisidir. */
	fax1?: string | null;
	city: GeneralLookupModel;
	country: GeneralLookupModel;
	/** Cep telefonu numarası bilgisidir. */
	mobilePhone1?: string | null;
	/** Posta kodu */
	postalCode?: string | null;
	/** Kapı no */
	room?: string | null;
	/** Bulvar,cadde veya sokak */
	streetName?: string | null;
	/** Blok Adı */
	blockName?: string | null;
	/** Bina adı */
	buildingName?: string | null;
	/** Bina no */
	buildingNumber?: string | null;
	/** İlçe */
	citySubdivision: string;
	/** Kasaba veya köy */
	region?: string | null;
	/** Mahalle */
	district?: string | null;
	/** Web sitesi */
	webSiteUrl?: string | null;
	category?: CategoryModel;
}

/**
 * StockStatementRequestModel
 */
export interface StockStatementRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Belge tarihi başlangıç alanıdır. */
	docDateS?: string | null;
	/** Belge bitiş tarihi alanıdır. */
	docDateE?: string | null;
	/** Depo kodu alanıdır. */
	warehouseCode?: string | null;
	/** Stok kod başlangıç alanıdır. */
	productCodeS?: string | null;
	/** Stok kod bitiş alanıdır. */
	productCodeE?: string | null;
}

/**
 * StockStatementResultModel
 */
export interface StockStatementResultModel {
	/** Belge tarihi bilgisidir. */
	docDate?: string;
	/** Belge numarası bilgisidir. */
	docNo?: string | null;
	/** Hareketin oluştuğu kaynak bilgisidir. */
	source?: string | null;
	/** İşlem tipinin kod bilgisidir. */
	transactionTypeCode?: string | null;
	/** İşlem tipinin ad bilgisidir. */
	transactionTypeName?: string | null;
	/** Cari kodu bilgisidir. */
	accountCode?: string | null;
	/** Cari adı bilgisidir. */
	accountName?: string | null;
	/** Depo tablosunun tekil alanıdır. */
	warehouseId?: number;
	/** Depo kodu bilgisidir. */
	warehouseCode?: string | null;
	/** Depo adı bilgisidir. */
	warehouseName?: string | null;
	/** Stok tablosunun tekil alanıdır. */
	productId?: number;
	/** Stok kodu bilgisidir. */
	productCode?: string | null;
	/** Stok adı bilgisidir. */
	productName?: string | null;
	/** Birim kodu bilgisidir. */
	unitCode?: string | null;
	/** Hareket miktarı bilgisidir. decimal precision : number(18,6) */
	qtyPrm?: number;
	/** Birim fiyat bilgisidir. decimal precision : number(18,6) */
	unitPriceTra?: number;
	/** Tutar bilgisidir. decimal precision : number(18,2) */
	amt?: number;
	/** Kalan miktar bilgisidir. decimal precision : number(18,6) */
	balanceQtyPrm?: number;
	/** Kalan tutar bilgisidir. decimal precision : number(18,6) */
	balanceAmt?: number;
}

export interface StockStatementResultModelQueryResultList {
	data?: StockStatementResultModel[] | null;
	succeed?: boolean;
	confirm?: boolean;
	confirmType?: number;
	message?: string | null;
	errorCode?: string | null;
}

export interface StringListResultModel {
	data?: string[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface StringResultModel {
	data?: string | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface Taraf {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
}

/**
 * İş ortağı tarife detay bilgileri
 */
export interface TariffDetailModel {
	/** Adet */
	qty?: number;
	/** Tutar */
	amt?: number;
	/** Not */
	note?: string | null;
}

/**
 * İş ortağı tarife bilgileri
 */
export interface TariffModel {
	/** Tarife Id */
	id?: number;
	/** Tarife Kodu */
	tariffCode?: string | null;
	/** Tarife Adı */
	tariffName?: string | null;
	/** İlgili tarifenin içerik bilgisini gösterir (E-Fatura,E-Arşiv Fatura vs.) */
	tariffProductDetailList?: ProductActivationProductTypeRelModel[] | null;
	/** Fatura Açıklaması */
	invoiceDescription?: string | null;
	/** Geçerli Ay */
	validityMonth?: number;
	/** Pasif mi */
	isPassive?: boolean;
	/** İş ortağı tarife detayları */
	tariffDetailList?: TariffDetailModel[] | null;
}

export interface TariffModelListResultModel {
	data?: TariffModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

export interface TasimaSekli {
	havaTasimaciligi?: HavaTasimaciligi;
	karayoluTasimaciligi?: KarayoluTasimaciligi;
	demiryoluTasimaciligi?: DemiryoluTasimaciligi;
	denizTasimaciligi?: DenizTasimaciligi;
}

export interface TasimaUnitesi {
	dorsePlakalari?: string[] | null;
}

export type TaxCodeContentType =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32
	| 33
	| 34
	| 35
	| 36
	| 37
	| 38
	| 39
	| 40
	| 41
	| 42
	| 43
	| 44
	| 45
	| 46
	| 47
	| 48
	| 49
	| 50
	| 51
	| 52
	| 53
	| 54
	| 55
	| 56
	| 57
	| 58
	| 59
	| 60
	| 61
	| 62
	| 63
	| 64
	| 65
	| 66
	| 67
	| 68
	| 69
	| 70
	| 71
	| 72
	| 73
	| 74
	| 75
	| 76
	| 77
	| 78
	| 79
	| 80
	| 81
	| 82
	| 83
	| 84
	| 85;

export type TaxExemptionReasonCodeContentType =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32
	| 33
	| 34
	| 35
	| 36
	| 37
	| 38
	| 39
	| 40
	| 41
	| 42
	| 43
	| 44
	| 45
	| 46
	| 47
	| 48
	| 49
	| 50
	| 51
	| 52
	| 53
	| 54
	| 55
	| 56
	| 57
	| 58
	| 59
	| 60
	| 61
	| 62
	| 63
	| 64
	| 65
	| 66
	| 67
	| 68
	| 69
	| 70
	| 71
	| 72
	| 73
	| 74
	| 75
	| 76
	| 77
	| 78
	| 79
	| 80
	| 81
	| 82
	| 83
	| 84
	| 85
	| 86
	| 87
	| 88
	| 89
	| 90
	| 91
	| 92
	| 93
	| 94
	| 95
	| 96
	| 97
	| 98
	| 99
	| 100
	| 101
	| 102
	| 103
	| 104
	| 105
	| 106;

/**
 * Vergi Muafiyet Nedeni model
 */
export interface TaxExemptionReasonModel {
	/** Vergi muafiyet sebep tablosunun tekil alanıdır. */
	id?: number;
	/** Vergi muafiyet kodu */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet adı */
	taxExemptionReasonName?: string | null;
}

export interface TaxExemptionReasonModelListResultModel {
	data?: TaxExemptionReasonModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Mysoft sistemlerinde tanımlı olan vergi dairesi kodu ve adı verilmelidir.
 */
export interface TaxOfficeLookupModel {
	/** Vergi Dairesi Kodu */
	taxOfficeCode?: string | null;
	/** Vergi Dairesi Adı */
	taxOfficeName?: string | null;
}

/**
 * Vergi dairesi bilgilerini tutar
 */
export interface TaxOfficeModel {
	/** Vergi dairesi tablosunun tekil alanıdır. */
	id?: number;
	/** Vergi dairesi kodu */
	taxOfficeCode?: string | null;
	/** Vergi dairesi adı */
	taxOfficeName?: string | null;
}

export interface TaxOfficeModelListResultModel {
	data?: TaxOfficeModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Aracı kurum bilgileri
 */
export interface TaxRepresentativeModel {
	/** Aracı kurum vkn */
	identifierNumber?: string | null;
	/** Aracı kurum etiket bilgisi */
	alias?: string | null;
	/** Ülke Adı */
	countryName?: string | null;
	/** İl Adı */
	cityName?: string | null;
	/** İlçe Adı */
	citySubdivisionName?: string | null;
}

/**
 * Vergi Alt bilgisi
 */
export interface TaxSubTotal {
	/** Verginin üzerinden hesaplandığı tutar (matrah) bilgisi girilecektir. */
	taxableAmount?: number;
	/** Hesaplanan vergi Tutarıdır. */
	taxAmount?: number;
	/** Sıra no */
	calculationSequenceNumeric?: number;
	/** Vergi Oran alanıdır */
	percent?: number;
	/** Vergi adı bilgisidir. */
	taxName?: string | null;
	/** Vergi Kodu alanıdır */
	taxTypeCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana kodlu olarak girilecektir. */
	taxExemptionReasonCode?: string | null;
	/** Vergi muafiyet, istisna sebepleri bu alana serbest metin olarak girilecektir. */
	taxExemptionReasonName?: string | null;
}

/**
 * Vergi bilgisi
 */
export interface TaxTotal {
	/** Hesaplanan vergi Tutarıdır. */
	taxAmount?: number;
	/** Vergi detayları */
	taxSubTotal?: TaxSubTotal[] | null;
}

/**
 * Mükellef Adres Bilgisi
 */
export interface TaxpayerAddressApiModel {
	/** Adres Tipi (2: "İş Yeri Adresi” 3 :"Kanuni veya İş Merkezi Adresi") */
	addressType?: number | null;
	/** Adres Tipi Açıklaması */
	addressTypeDescription?: string | null;
	/** Semt */
	district?: string | null;
	/** Bölge */
	region?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Bina No */
	buildingNumber?: string | null;
	/** İç Kapı No */
	room?: string | null;
	/** Mahalle */
	township?: string | null;
	/** İlçe Adı */
	townName?: string | null;
	/** İl Adı */
	cityName?: string | null;
	/** İl Kodu */
	cityCode?: string | null;
	/** İlçe Kodu */
	townCode?: string | null;
}

/**
 * Mükellef Bilgileri
 */
export interface TaxpayerApiModel {
	/** Vergi Kimlik Numarası */
	taxIdentifierNumber?: string | null;
	/** TC Kimlik Numarası */
	tcIdentifierNumber?: string | null;
	/** Adı */
	firstName?: string | null;
	/** Soyadı */
	lastName?: string | null;
	/** Vergi Dairesi Adı */
	taxOfficeName?: string | null;
	/** Vergi Dairesi Kodu */
	taxOfficeCode?: string | null;
	/** Mükellef Tipi */
	companyType?: number | null;
	/** Faal Terk Durumu */
	activityTerminationStatus?: number | null;
	/** İşe Başlama Tarihi */
	workStartDate?: string | null;
	/** İş Bitiş Tarihi */
	workEndDate?: string | null;
	/** Kimlik Unvanı */
	identityTitle?: string | null;
	/** Unvan */
	tradeName?: string | null;
	/** Kimlik potansiyel durumu */
	identityPotentialStatus?: number | null;
	/** Mükellef Nace Listesi */
	taxpayerNaceList?: TaxpayerNaceApiModel[] | null;
	/** Mükellef Adres Listesi */
	taxpayerAddressList?: TaxpayerAddressApiModel[] | null;
}

export interface TaxpayerApiModelResultModel {
	data?: TaxpayerApiModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Mükellef Nace modeli
 */
export interface TaxpayerNaceApiModel {
	/** NACE Kodu */
	naceCode?: string | null;
	/** NACE Adı */
	naceName?: string | null;
	/** Sıra numarası */
	sortOrder?: number | null;
}

/**
 * Teknoloji destek faturası girildiğinde zorunludur.
 */
export interface TechnologyAssistanceDeviceInfo {
	/** Bu alana TELEFON yada TABLET_PC yazılabilir. */
	schemaId?: string | null;
	/** schemaId = TELEFON olması durumunda girilmelidir. */
	technologyAssistanceDeviceInfoDetail?: TechnologyAssistanceDeviceInfoDetail[] | null;
}

/**
 * Teknoloji destek faturasındaki detaylar için kullanılan sınıf
 */
export interface TechnologyAssistanceDeviceInfoDetail {
	/** schemaId = TELEFON olması durumunda girilmelidir. */
	iMEINo?: string | null;
}

export interface Tedarikci {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
}

/**
 * Firma Adres Bilgilerini tutar
 */
export interface TenantAdressModel {
	country: GeneralLookupModel;
	city: GeneralLookupModel;
	/** İlçe bilgisidir. */
	citySubdivision: string;
	/** Mahalle bilgisidir. */
	district?: string | null;
	/** Bulvar,cadde veya sokak bilgisidir. */
	streetName?: string | null;
	/** Blok adı bilgisidir. */
	blockName?: string | null;
	/** Blok adı bilgisidir. */
	buildingName?: string | null;
	/** Bina no bilgisidir. */
	buildingNumber?: string | null;
	/** Kapı no bilgisidir. */
	room?: string | null;
	/** Kasaba veya köy bilgisidir. */
	region?: string | null;
	/** Posta kodu bilgisidir. */
	postalCode?: string | null;
}

/**
 * Kontör Tüketim Bilgisi Modeli
 */
export interface TenantCreditConsumptionInfoModel {
	/** Kontör Yükleme Bilgisi */
	documentCreditQueryList?: DocumentCreditQueryModel[] | null;
	/** Tüketim Bilgisi */
	counterByProductList?: CounterByProductModel[] | null;
}

export interface TenantCreditConsumptionInfoModelResultModel {
	data?: TenantCreditConsumptionInfoModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Müşteri kontör kullanım bilgisi
 */
export interface TenantCreditResultModel {
	/** Kontör geçerlilik başlangıç tarihi */
	startDate?: string;
	/** Kontör geçerlilik bitiş tarihi */
	endDate?: string;
	/** Yüklenen kontör */
	creditQty?: number;
	/** Kalan kontör */
	remainingCreditQty?: number;
	/** Yüklenen kontörün geçerli olduğu ürün listesi */
	productTypeList?: string[] | null;
	/** Süresi geçtimi? */
	isExpired?: boolean;
}

export interface TenantCreditResultModelListResultModel {
	data?: TenantCreditResultModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Firma sözleşme bilgilerini temsil eden model sınıfı.
 */
export interface TenantPreContractGetModel {
	/** Kayıt için benzersiz kimlik. */
	id?: number;
	/** Firmanın vergi kimlik numarası veya TC kimlik numarası. */
	tenantVknTckn?: string | null;
	/** Firmanın adı veya ünvanı. */
	tenantName?: string | null;
	/** Tarife kodu. */
	tariffCode?: string | null;
	/** Tarife adı. */
	tariffName?: string | null;
	/** Sözleşmenin başlangıç tarihi. Eğer kontör yüklenmişse kontör yükleme tarihi, aksi hâlde sözleşme başlangıç tarihi kullanılır */
	startDate?: string | null;
	/** Sözleşmenin bitiş tarihi. Eğer kontör yüklenmişse kontör son geçerlilik tarihi, aksi hâlde sözleşme bitiş tarihi kullanılır. */
	endDate?: string | null;
	/** Kontör miktarı. */
	creditQty?: number | null;
	/** Kontörün yüklenip yüklenmediğini belirten açıklama. "Kontör Yüklendi" veya "Kontör Yüklenmedi" değerlerini alır. */
	isLoadCredit?: string | null;
}

export interface TenantPreContractGetModelListResultModel {
	data?: TenantPreContractGetModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Kamu entegrasyon bilgileri
 */
export interface TenantPublicIntegrationSaveRequestModel {
	/** Dizaynın oluşturulacağı firmanın vknTckn bilgisidir. */
	vknTckn: string;
	/** Entegrasyon Tipi. İnteraktif Vergi Dairesi(1),E-Beyanname(2),Türmob(3) */
	publicIntegrationType: number;
	/** Kullanıcı Adı. (İnteraktif Vergi Dairesi ve e-Beyanname için kullanılıyor) */
	username?: string | null;
	/** Şifre. (İnteraktif Vergi Dairesi ve e-Beyanname için kullanılıyor) */
	password?: string | null;
	/** API Key. (Türmob için kullanılıyor) */
	apiKey?: string | null;
	/** Faturalar Otomatik Aktarılsın. (İnteraktif Vergi Dairesi için kullanılıyor) */
	isAutoGetEArchiveInbox?: boolean;
}

export interface Teslimat {
	tasiyici?: Taraf;
	fiiliSevkTarihi?: string;
	gerceklesenTeslimTarihi?: string;
	teslimatYapilacak?: Taraf;
}

/**
 * Gönderim şekli bilgilerini tutar
 */
export interface TransportModeModel {
	/** Gönderim şekli tablosunun tekil alanıdır. */
	id: number;
	/** Gönderim şekli kodu alanıdır */
	transportModeCode: string;
	/** Gönderim şekli adı alanıdır */
	transportModeName: string;
}

export interface TransportModeModelListResultModel {
	data?: TransportModeModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Birim Model
 */
export interface UnitModel {
	/** Birim tablosunun tekil alanıdır. */
	id?: number;
	/** Birim Kodu alanıdır */
	unitCode?: string | null;
	/** Birim Adı alanıdır */
	unitName?: string | null;
	/** Birimin standard ISO kodu alanıdır */
	isoUnitCode?: string | null;
}

export interface UnitModelListResultModel {
	data?: UnitModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Kullanıcı Firma Model
 */
export interface UserCompanyModel {
	/** Firma Id */
	id?: number;
	/** Firma Adı */
	name?: string | null;
	/** Vergi Dairesi Adı */
	taxOfficeName?: string | null;
	/** Firma VKN/TCKN alanı */
	identifierNumber?: string | null;
	/** Firma Logosu */
	logo_base64?: string | null;
	/** Ülke */
	country?: string | null;
	/** İl */
	city?: string | null;
	/** İlçe */
	citySubdivision?: string | null;
	/** Sokak */
	street?: string | null;
	/** Bina Adı */
	buildingName?: string | null;
	/** Bina No */
	buildingNumber?: string | null;
	/** Kapı No */
	room?: string | null;
	/** Telefon */
	phone?: string | null;
	/** E-Fatura Aktivasyon Tarihi */
	eInvoiceActivationDate?: string | null;
	/** E-Arşiv Aktivasyon Tarihi */
	eArchiveActivationDate?: string | null;
	/** Kalan e-belge kredisi */
	eDocumentRemainingCredit?: number;
}

export interface UserCompanyModelListResultModel {
	data?: UserCompanyModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Kullanıcı Model
 */
export interface UserInfoModel {
	/** İsim */
	name?: string | null;
	/** Soyisim */
	surname?: string | null;
	/** id */
	id?: number;
	/** EMail */
	email?: string | null;
}

export interface UserInfoModelResultModel {
	data?: UserInfoModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Araç bilgisi
 */
export interface VehicleInfoModel {
	/** Plaka bilgisidir. İçinde boşluk olmadan büyük harf kullanılarak yazılmalıdır. PLAKA için Örn: 34ABC12345 YABANCIPLAKA için Örn: ABC123 */
	licencePlate?: string | null;
	/** Plaka bilgisinin schemaId bilgisidir. Boş gönderildiğinde varsayılan değer PLAKA dır. Geçerli Değerler : PLAKA, YABANCIPLAKA */
	licencePlateSchemaId?: string | null;
	/** Araç Kimlik Numarası */
	vehicleNumber?: string | null;
}

export interface Vergi {
	tur?: TaxCodeContentType;
	oran?: number;
	tutar?: number;
	matrah?: number;
	muafiyetNedeni?: string | null;
	muafiyetKodu?: TaxExemptionReasonCodeContentType;
}

export interface VergiTemsilcisi {
	firmaAdi?: string | null;
	sokak?: string | null;
	binaAdi?: string | null;
	kapiNo?: string | null;
	ilceSemt?: string | null;
	il?: string | null;
	ulke?: string | null;
	postaKodu?: string | null;
	vergiDairesi?: string | null;
	vergiNoTCKimlikNo?: string | null;
	webAdresi?: string | null;
	eposta?: string | null;
	telefon?: string | null;
	fax?: string | null;
	hizmetNo?: string | null;
	musteriNo?: string | null;
	tesisatNo?: string | null;
	telefonNo?: string | null;
	distributorNo?: string | null;
	ticaretSicilNo?: string | null;
	tapdkNo?: string | null;
	bayiNo?: string | null;
	aboneNo?: string | null;
	sayacNo?: string | null;
	ureticiNo?: string | null;
	ciftciNo?: string | null;
	imalatciNo?: string | null;
	dosyaNo?: string | null;
	hastaNo?: string | null;
	subeNo?: string | null;
	mersisNo?: string | null;
	masaNo?: string | null;
	kullanici?: string | null;
	ilce?: string | null;
	blokAdi?: string | null;
	naceKodu?: string | null;
	kurumResmiUnvan?: string | null;
	kurumKayitNumarasi?: string | null;
	vergiTipiKodu?: string | null;
	tarafTuru?: string | null;
	araciKurumVergiNo?: string | null;
	araciKurumEtiket?: string | null;
	sahis?: Sahis;
	musteriTuru?: string | null;
}

/**
 * IYS Via izin için onay kodu modeli
 */
export interface ViaConsentConfirmationCodeDetail {
	/** Alıcı tarafından iletilen doğrulama kod bilgisidir. */
	confirmationCode: string;
	/** İzin talebi çift OTP isteği ile yapıldıysa gönderilen OTP değerinin hangi izin türü için verildiği bilgisidir. string(Enum)("ETK","KVKK")
 Gönderilen izin çift OTP isteği ile yapılmadıysa bu alan boş bırakılmalıdır. */
	consentsType?: string | null;
}

/**
 * IYS Via izin için onay modeli
 */
export interface ViaConsentConfirmationCodeRequest {
	/** Gönderilen SMS/Email sonucunda alınan referans kodu */
	referanceKey: string;
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** IYS Via izin için onay kodu bilgisidir. */
	viaConsentConfirmationCodeDetail: ViaConsentConfirmationCodeDetail[];
}

/**
 * IYS Via izin için onay kodu gönderim sonucu
 */
export interface ViaConsentConfirmationCodeResult {
	/** Onay kodu sonucu */
	confirmResult?: boolean;
}

export interface ViaConsentConfirmationCodeResultResultModel {
	data?: ViaConsentConfirmationCodeResult;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * IYS Via izin oluşturma istek modeli
 */
export interface ViaConsentFrameModel {
	/** Şablon adı bilgisidir. Zorunlu alandır. Portalda tanımlı şablon adlarından biri gönderilmelidir.Seçilen IYS şablon tipi parametresi ile uyumlu olan şablonlar girilmelidir. */
	consentsTemplateName?: string | null;
	/** Alıcı türü bilgisinin belirtildiği alandır. Zorunlu alandır.
 True olarak seçilirse BIREYSEL, False olarak seçilirse TACIR alıcı türü olarak kabul edilir. Zorunlu alandır. */
	isIndividual?: boolean;
	/** Eğer gönderilen IYS Via izninin üzerine özel bir değer yazılması isteniyorsa bu alan kullanılabilir. */
	serviceReferanceKey?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Zorunlu alandır. */
	tenantIdentifierNumber?: string | null;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
	/** IYS IFrame başarılı izin gönderme isteğinin sonucu olarak dönen JSON bilgisidir.
 (on-start-process-success methodundan alınan event.detail nesnesi) */
	startSuccessResponse?: string | null;
	/** IYS IFrame başarılı işlem sonucu JSON bilgisidir.
 (on-complete-process-success methodundan alınan event.detail nesnesi) */
	completeSuccessResponse?: string | null;
}

/**
 * Alıcı KVK durum sorgu sınıfı
 */
export interface ViaConsentKVKKListRequest {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient?: string | null;
	/** Sorgu için başlangıç tarihi */
	startDate?: string;
	/** Sorgu için bitiş tarihi */
	endDate?: string;
}

/**
 * KVKK İzin Listesi Sonuç Modeli
 */
export interface ViaConsentKVKKListResult {
	/** İzin gönderildiği tarih ve saat bilgisidir. */
	createDate?: string | null;
	createUserFullName?: string | null;
	/** Alıcının isim bilgisidir. */
	fullName?: string | null;
	/** Alıcının TCKN veya VKN bilgisidir. */
	recipientIdNumber?: string | null;
	/** Alıcının Mail/Telefon bilgisidir. */
	recipient?: string | null;
	consentsTemplateName?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">AYDINLATMA_METNI</code></li><li><code style="color: black;">ACIK_RIZA_METNI</code></li><li><code style="color: black;">YURTDISI_AKTARIM</code></li></ul>
 Alıcıdan onayı talep edilen izin türü bilgisidir. */
	viaConsentsTypeKVK?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">Bekliyor</code></li><li><code style="color: black;">Onay</code></li><li><code style="color: black;">Red</code></li><li><code style="color: black;">Cevap Verilmedi</code></li></ul>
 Alıcının talep edilen izne verdiği yanıt bilgisidir. */
	viaConsentsStatus?: string | null;
	/** Alıcının talep edilen izne yanıt verdiği zaman bilgisidir. */
	resultUpdateDate?: string | null;
}

export interface ViaConsentKVKKListResultListResultModel {
	data?: ViaConsentKVKKListResult[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Alıcı KVK durum sorgu sınıfı
 */
export interface ViaConsentKVKRequest {
	/** İşlem yapılması istenen firmanın VKN/TCKN bilgisidir. */
	tenantIdentifierNumber: string;
	/** Alıcının sistemde kayıtlı telefon numarası veya e-posta bilgisidir. E-posta adresleri 265, telefon numaraları 15 karakterden daha uzun olamaz. Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır. */
	recipient: string;
}

/**
 * KVKK İzin Sonuç Modeli
 */
export interface ViaConsentKVKResult {
	/** İzin gönderildiği tarih ve saat bilgisidir. */
	createDate?: string | null;
	/** Alıcının isim bilgisidir. */
	firstName?: string | null;
	/** Alıcının soyad bilgisidir. */
	familyName?: string | null;
	/** Alıcının TCKN veya VKN bilgisidir. */
	recipientIdNumber?: string | null;
	/** Alıcıya gönderilen FormId bilgisidir. */
	formId?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">AYDINLATMA_METNI</code></li><li><code style="color: black;">ACIK_RIZA_METNI</code></li><li><code style="color: black;">YURTDISI_AKTARIM</code></li></ul>
 Alıcıdan onayı talep edilen izin türü bilgisidir. */
	viaConsentsTypeKVK?: string | null;
	/** Enum: 
 
 <ul><li><code style="color: black;">Bekliyor</code></li><li><code style="color: black;">Onay</code></li><li><code style="color: black;">Red</code></li><li><code style="color: black;">Cevap Verilmedi</code></li></ul>
 Alıcının talep edilen izne verdiği yanıt bilgisidir. */
	viaConsentsStatus?: string | null;
	/** Alıcının talep edilen izne yanıt verdiği zaman bilgisidir. */
	resultUpdateDate?: string | null;
}

export interface ViaConsentKVKResultListResultModel {
	data?: ViaConsentKVKResult[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * IYS Via izin gönderim modeli
 */
export interface ViaConsentModel {
	/** Şablon adı bilgisidir. Zorunlu alandır. Portalda tanımlı şablon adlarından biri gönderilmelidir.Seçilen IYS şablon tipi parametresi ile uyumlu olan şablonlar girilmelidir. */
	consentsTemplateName?: string | null;
	/** Alıcıdan onayı istenilecek telefon numarası veya e-posta bilgisidir.  
 Telefon numaraları E164 uluslararası([+][country code][area code][local phone number]) formata uygun olmalıdır.
 * Gönderilen iYSConsentsTemplateCode un arkasındaki IYS şablon tipi “SMS-KISA LİNK(ETK), SMS-KISA LİNK(KVKK), SMS-KISA LİNK(ETK,KVKK),SMS-OTP” olması durumunda bu alana telefon bilgisi değeri girilmelidir.
 * Gönderilen iYSConsentsTemplateCode un arkasındaki IYS şablon tipi “EPOSTA-KISA LİNK(ETK), EPOSTA-KISA LİNK(KVKK), EPOSTA-KISA LİNK(ETK,KVKK),EPOSTA-OTP” olması durumunda bu alana e-posta bilgisi değeri girilmelidir. */
	recipient?: string | null;
	/** KVKK onayı alınacak alıcıya ait ad bilgisidir.  
 KVKK onay sürecinde bu alan zorunludur.
 * Gönderilen iYSConsentsTemplateCode un arkasındaki IYS şablon tipi “SMS-KISA LİNK(KVKK), EPOSTA-KISA LİNK(KVKK), SMS-KISA LİNK(ETK,KVKK), EPOSTA-KISA LİNK(ETK,KVKK)” olması durumunda KVKK süreçlerinden dolayı değer girilmelidir. */
	firstName?: string | null;
	/** KVKK onayı alınacak alıcıya ait soyadı bilgisidir.  
 Not: KVKK onay sürecinde bu alan zorunludur.
 * Gönderilen IYSConsentsTemplateCode un arkasındaki IYS şablon tipi “SMS-KISA LİNK(KVKK), EPOSTA-KISA LİNK(KVKK), SMS-KISA LİNK(ETK,KVKK), EPOSTA-KISA LİNK(ETK,KVKK)” olması durumunda KVKK süreçlerinden dolayı değer girilmelidir. */
	familyName?: string | null;
	/** KVKK onayı alınacak alıcıya ait TC Kimlik numarası bilgisidir.
	 * Gönderilen IYSConsentsTemplateCode un arkasındaki IYS şablon tipi “SMS-KISA LİNK(KVKK), EPOSTA-KISA LİNK(KVKK), SMS-KISA LİNK(ETK,KVKK), EPOSTA-KISA LİNK(ETK,KVKK)” olması durumunda KVKK süreçlerinden dolayı değer gönderilebilir. */
	recipientIdNumber?: string | null;
	/** Alıcı türü bilgisidir.[“BIREYSEL”, “TACIR”)] 
 Not: Bu alan ETK süreci için zorunludur.
 * IYS şablon tipi “SMS-KISA LİNK(ETK), EPOSTA-KISA LİNK(ETK), SMS-KISA LİNK(ETK, KVKK), EPOSTA-KISA LİNK(ETK, KVKK), SMS-OTP, EPOSTA-OTP” olması durumunda ETK süreçlerinden dolayı değer girilmelidir. */
	recipientType?: string | null;
	/** Eğer gönderilen IYS Via izninin üzerine özel bir değer yazılması isteniyorsa bu alan kullanılabilir. */
	serviceReferanceKey?: string | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Mysoft Portal üzerinde izinlerin tutulacağı klasör bilgisini ifade eder. Raporlama için kullanılabilir. */
	folderName?: string | null;
}

/**
 * Gönderilen IYS Via iznine ait sonuç bilgilerini içeren sınıf
 */
export interface ViaConsentSendResult {
	/** Oluşan IYS Via izin kaydının tekil Id'si */
	referanceKey?: string | null;
}

export interface ViaConsentSendResultResultModel {
	data?: ViaConsentSendResult;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * VIA ETK Sonuç sınıfı
 */
export interface ViaStatusETKResultModel {
	/** Alıcıdan onayı talep edilen marka kodu bilgisidir. */
	tenantBrandCode?: string | null;
	/** Alıcıdan onayı talep edilen izin türü bilgisidir.[“ARAMA”, “SMS”, “EPOSTA” ] */
	viaConsentsType?: string | null;
	/** Alıcının talep edilen izne verdiği yanıt bilgisidir.[“ONAY”, “RET”] */
	viaConsentsStatus?: string | null;
	/** Alıcının talep edilen izne yanıt verdiği zaman bilgisidir. */
	resultUpdateDate?: string | null;
}

/**
 * VIA Durum sınıfı
 */
export interface ViaStatusResultModel {
	/** Gönderilen izin talebinin Mysoft Portaldeki durum bilgisidir. */
	portalViaStatus?: string | null;
	/** İzin talebi gönderim zamanı bilgisidir. */
	sendDate?: string | null;
	/** Alıcıdan onayı talep edilen telefon numarası veya e-posta bilgisidir. */
	recipient?: string | null;
	/** Alıcı türü bilgisidir.[“BIREYSEL”, “TACIR”] */
	recipientType?: string | null;
	/** IYS Süreç Başlama Zamanı bilgisidir. */
	iYSProcessStartDate?: string | null;
	/** IYS Son Durum Zamanı bilgisidir. */
	lastUpdateDate?: string | null;
	/** IYS KVKK Son Durum bilgisidir. */
	kVKKRequestStatus?: string | null;
	/** IYS ETK Son Durum bilgisidir. */
	eTKRequestStatus?: string | null;
	/** Hata Mesajı bilgisidir. */
	errorDescription?: string | null;
	/** ETK Listesi */
	eTKResultModelList?: ViaStatusETKResultModel[] | null;
}

export interface ViaStatusResultModelResultModel {
	data?: ViaStatusResultModel;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Stok ile ilişkili depoların bilgisi
 */
export interface WarehouseApiRelModel {
	/** Depo Id */
	id?: number;
	/** Depo Kod */
	warehouseCode?: string | null;
}

/**
 * Fatura Depo model
 */
export interface WarehouseInvoiceApiModel {
	/** Depo Id */
	id?: number;
	/** Depo Kodu */
	warehouseCode?: string | null;
}

/**
 * Depo Tanımı
 */
export interface WarehouseModel {
	/** Depo tanımının tekil anahtarı */
	id?: number;
	/** Depo Kodu */
	warehouseCode?: string | null;
	/** Depo Adı */
	warehouseName?: string | null;
	city?: GeneralLookupModel;
	country?: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Blok */
	blockName?: string | null;
	/** Bina Adı */
	buildingName?: string | null;
	/** Bina No */
	buildingNumber?: string | null;
	/** Kapı No */
	room?: string | null;
	/** Posta Kodu */
	postalCode?: string | null;
	/** Bölge */
	region?: string | null;
	/** Semt */
	district?: string | null;
	/** Telefon */
	telephone?: string | null;
	/** Fax */
	fax?: string | null;
	/** E-Mail */
	email?: string | null;
	/** WebSitesi */
	websiteURL?: string | null;
	/** Varsayılan depo mu? */
	isDefault?: boolean | null;
}

export interface WarehouseModelListResultModel {
	data?: WarehouseModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * Depo Stok Listesi istek sınıfı
 */
export interface WarehouseProductRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Depo kodu filtresi, Eşit olarak bakılır. */
	warehouseCode?: string | null;
	/** Stok kodu filtresi, Eşit olarak bakılır. */
	productCode?: string | null;
	/** Taslak satış faturası miktarlarının da gelmesini sağlar, True ya da False değeri gönderilir. */
	isGetSalesInvoiceQtyPrm?: boolean | null;
}

/**
 * Depo listesi istek sınıfı
 */
export interface WarehouseRequestModel {
	/** Buraya geçilen değerden itibaren kayıtlar dönülecektir. */
	afterValue?: number;
	/** Aynı anda kaç kayıt dönülebileceğini belirtir. */
	limit?: number;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
	/** Depo kodu filtresi, Eşit olarak bakılır. */
	warehouseCode?: string | null;
	/** Depo adı filtresi, Başlayan olarak bakılır. */
	warehouseName?: string | null;
}

/**
 * Depo kaydetme sınıfı
 */
export interface WarehouseSaveModel {
	/** Depo tanımının tekil anahtarı */
	id?: number;
	/** Depo Kodu */
	warehouseCode?: string | null;
	/** Depo Adı */
	warehouseName?: string | null;
	city?: GeneralLookupModel;
	country?: GeneralLookupModel;
	/** İlçe bilgisidir */
	citySubdivision?: string | null;
	/** Sokak */
	streetName?: string | null;
	/** Blok */
	blockName?: string | null;
	/** Bina Adı */
	buildingName?: string | null;
	/** Bina No */
	buildingNumber?: string | null;
	/** Kapı No */
	room?: string | null;
	/** Posta Kodu */
	postalCode?: string | null;
	/** Bölge */
	region?: string | null;
	/** Semt */
	district?: string | null;
	/** Telefon */
	telephone?: string | null;
	/** Fax */
	fax?: string | null;
	/** E-Mail */
	email?: string | null;
	/** WebSitesi */
	websiteURL?: string | null;
	/** Varsayılan depo mu? */
	isDefault?: boolean | null;
	/** Verilen depo kodu yada id ile içeride kayıt mevcut ise, güncellenip güncellenmeyeceğini belirtmek için kullanılır. */
	isUpdateIfExists?: boolean | null;
	/** İşlem yapılması istenen müşterinin VKN/TCKN si gönderilir. Eğer servis kullanıcısına birden fazla müşteri bağlandıysa kullanılacak bir alandır. Bir müşteri varsa boş bırakınız. */
	tenantIdentifierNumber?: string | null;
}

/**
 * İrsaliye bilgisi
 */
export interface WaybillInfo {
	/** İrsaliye No alanıdır */
	waybillNo?: string | null;
	/** İrsaliye Tarihi alanıdır */
	waybillDate?: string | null;
}

/**
 * Tevkifat bilgilerini tutar
 */
export interface WithholdingTaxTypeModel {
	/** Tevkifat tanım tablosunun tekil alanıdır. */
	id?: number;
	/** Tevkifat kodu */
	withholdingTaxTypeCode?: string | null;
	/** Tevkifat adı */
	withholdingTaxTypeName?: string | null;
	/** Tevkifat oranı */
	rate?: string | null;
}

export interface WithholdingTaxTypeModelListResultModel {
	data?: WithholdingTaxTypeModel[] | null;
	succeed?: boolean;
	message?: string | null;
	errorCode?: string | null;
	afterValue?: number;
}

/**
 * XSLT Önizleme istek sınıfı
 */
export interface XsltPreviewRequestModel {
	/** Belge tipi (1 - E-Fatura, 2 - E-Arşiv Fatura, 3 - E-İrsaliye, 
 4 - E-İrsaliye Yanıt, 5 - Serbest Meslek Makbuzu, 6 - Müstahsil Makbuzu , 
 7 - E-Döviz ve Kıymetli Maden Satım
 8 - E-Döviz ve Kıymetli Maden Alım, 9 - E-Adisyon, 10 - E-Arşiv Fatura (GIB), 93 - Cari Mutabakat, 94 - BaBs Mutabakat, 95 - Fatura, 
 96 - İrsaliye, 97 - Sipariş, 100 - Çek, 101 Senet, 102 - Finans */
	edocumentType: number;
	/** İnternet Satış içinmi? */
	isInternetSales?: boolean | null;
	/** İlgili xslt dosyasının ziplendikten sonra base64 stringe çevrilmiş halidir. */
	xsltFile: string;
}
