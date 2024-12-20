"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
let specializationMap = [
  { key: "CPE", specialization: "هندسة حاسوب" },
  { key: "AL", specialization: "جامعة اجباري" },
  { key: "BME", specialization: "هندسة النظم الطبية الحيوية" },
  { key: "BMIE", specialization: "هندسة النظم الطبية الحيوية" },
  { key: "CE", specialization: "الهندسة المدنية" },
  { key: "CHEM", specialization: "كيمياء" },
  { key: "CIS", specialization: "علم حاسوب" },
  { key: "CME", specialization: "الهندسة الميكانيكية" },
  { key: "COMP", specialization: "جامعة اجباري" },
  { key: "EL", specialization: "جامعة اجباري" },
  { key: "ELE", specialization: "هندسة الالكترونيات" },
  { key: "EPE", specialization: "هندسة القوى والآلات الكهربائية" },
  { key: "HUM", specialization: "جامعة اختياري" },
  { key: "SCI", specialization: "جامعة اختياري" },
  { key: "IE", specialization: "هندسة صناعية" },
  { key: "MATH", specialization: "رياضيات" },
  { key: "MILT", specialization: "جامعة اجباري" },
  { key: "PHYS", specialization: "فيزياء" },
  { key: "PS", specialization: "جامعة اجباري" },
  { key: "STAT", specialization: "احصاء" },
  { key: "MPHY", specialization: "فيزياء طبية" },
];
let categoryMap = [
  { key: "0", label: "كتب" },
  { key: "1", label: "فيديو" },
  { key: "2", label: "سلايدات" },
  { key: "3", label: "سنوات" },
  { key: "4", label: "مصادر طلابية" },
];
let courseNameMap = [
  { courseCode: "IE 205", courseDescription: "المشاغل الهندسية" },
  { courseCode: "IE 211", courseDescription: "القياسات" },
  { courseCode: "IE 213", courseDescription: "مختبرالقياسات" },
  {
    courseCode: "IE 251",
    courseDescription: "اساسيات الاحتمالات والاحصاء للمهندسين",
  },
  { courseCode: "IE 262", courseDescription: "علوم المواد الهندسية" },
  { courseCode: "IE 263", courseDescription: "مختبر المواد الهندسية" },
  { courseCode: "IE 300", courseDescription: "تأهيل وظيفي (3)" },
  { courseCode: "IE 318", courseDescription: "قياس وتحليل العمل" },
  { courseCode: "IE 354", courseDescription: "الإحصاء الهندسي التطبيقي" },
  { courseCode: "IE 358", courseDescription: "بحوث عمليات (1)" },
  { courseCode: "IE 360", courseDescription: "ادارة العمليات" },
  { courseCode: "IE 361", courseDescription: "إدارة المشاريع الهندسية" },
  { courseCode: "IE 364", courseDescription: "تصميم أجزاء الاَلات" },
  { courseCode: "IE 366", courseDescription: "عمليات التصنيع (1)" },
  { courseCode: "IE 367", courseDescription: "مختبرعمليات التصنيع" },
  { courseCode: "IE 400", courseDescription: "تأهيل وظيفي (4)" },
  { courseCode: "IE 422", courseDescription: "هندسة العوامل البشرية" },
  { courseCode: "IE 423", courseDescription: "مختبر هندسة العوامل البشرية" },
  { courseCode: "IE 432", courseDescription: "اقتصاد هندسي" },
  { courseCode: "IE 454", courseDescription: "ضبط الجودة الإحصائي" },
  { courseCode: "IE 458", courseDescription: "نظم المحاكاة" },
  {
    courseCode: "IE 462",
    courseDescription: "التصميم والتصنيع باستخدام الحاسوب",
  },
  { courseCode: "IE 466", courseDescription: "عمليات التصنيع (2)" },
  { courseCode: "IE 478", courseDescription: "الوثوقية وادامة الصيانة" },
  { courseCode: "IE 500", courseDescription: "التدريب الميداني" },
  { courseCode: "IE 546", courseDescription: "تخطيط المنشآت" },
  { courseCode: "IE 556", courseDescription: "تخطيط نظم التصنيع" },
  { courseCode: "BME 300", courseDescription: "علم الميكانيكا الحيوية 1" },
  { courseCode: "BME 340", courseDescription: "نظم التحكم الآلي الحيوي" },
  { courseCode: "BME 356", courseDescription: "الإلكترونيات الطبية الحيوية" },
  {
    courseCode: "BME 357",
    courseDescription: "مختبر الإلكترونيات الطبية الحيوية",
  },
  { courseCode: "BME 362", courseDescription: "الإشارات والنظم الطبية" },
  {
    courseCode: "BME 366",
    courseDescription: "الدوائر القابلة للبرمجة و تطبيقاتها الطبية الحيوية",
  },
  {
    courseCode: "BME 367",
    courseDescription: "مختبر الدوائر القابلة للبرمجة ومعالجات التحكم الدقيق",
  },
  { courseCode: "BME 380", courseDescription: "المجسات الطبية" },
  { courseCode: "BME 390", courseDescription: "معالجة الإشارات الطبية" },
  {
    courseCode: "BME 391",
    courseDescription: "مختبر معالجة الإشارات الطبية الحيوية",
  },
  {
    courseCode: "BME 393",
    courseDescription: "مختبر فسيولوجيا الانسان والقراءات الحيوية",
  },
  { courseCode: "BME 394", courseDescription: "ميكانيكا الموائع الحيوية" },
  { courseCode: "BME 420", courseDescription: "القياسات الطبية" },
  {
    courseCode: "BME 421",
    courseDescription: "مختبر القياسات و المجسات الطبية",
  },
  { courseCode: "BME 422", courseDescription: "مفاهيم التصوير الطبي" },
  { courseCode: "BME 460", courseDescription: "الأجهزة الطبية" },
  {
    courseCode: "BME 461",
    courseDescription: "مختبر الأجهزة و المعدات الطبية",
  },
  { courseCode: "BME 462", courseDescription: "أجهزة التصوير الطبية" },
  { courseCode: "BME 463", courseDescription: "مختبر التصوير الطبي" },
  {
    courseCode: "BME 464",
    courseDescription: "نمذجة و تحليل الإشارات الطبية الحيوية",
  },
  {
    courseCode: "BME 466",
    courseDescription: "المحركات الكهربائية و تطبيقاتها في الأجهزة الطبية",
  },
  { courseCode: "BME 472", courseDescription: "المواد الحيوية" },
  {
    courseCode: "BME 473",
    courseDescription: "مختبر الميكانيكا والمواد الحيوية",
  },
  {
    courseCode: "BME 496",
    courseDescription: "ظاهرة الإنتقال الطبي و الديناميكا الحرارية",
  },
  { courseCode: "BME 498", courseDescription: "مشروع التخرج 1" },
  { courseCode: "BME 500", courseDescription: "التدريب الميداني" },
  {
    courseCode: "BME 520",
    courseDescription: "تصميم و صيانة الاجهزة الطبيه الحيويه",
  },
  { courseCode: "BME 522", courseDescription: "تصميم الاجهزة الطبيه الحيويه" },
  { courseCode: "BME 523", courseDescription: "مختبر صيانة الأجهزة الطبية" },
  { courseCode: "BME 566", courseDescription: "الأعضاء و الأطراف الصناعية" },
  { courseCode: "BME 596", courseDescription: "موضوعات خاصة" },
  { courseCode: "BME 598", courseDescription: "مشروع التخرج 2" },
  {
    courseCode: "BMIE 324",
    courseDescription: "مقدمة في الميكانيكا و المواد الحيوية و تطبيقاتها",
  },
  {
    courseCode: "BMIE 350",
    courseDescription: "برمجة تطبيقية في علم الأحياء الحسابي",
  },
  {
    courseCode: "BMIE 352",
    courseDescription: "مقدمة الى البيولوجيا الجزئية والكيمياء الحيوية",
  },
  { courseCode: "BMIE 362", courseDescription: "الاقتصاد والإدارة الهندسية" },
  { courseCode: "BMIE 402", courseDescription: "سجلات المريض الإلكترونية" },
  { courseCode: "BMIE 431", courseDescription: "مختبر المعلومات الحيوية 1" },
  {
    courseCode: "BMIE 432",
    courseDescription: "طرق إحصائية للمعلوماتية الحيوية1",
  },
  {
    courseCode: "BMIE 435",
    courseDescription: "مختبر تطبيقات الحاسوب في المعلوماتية الحيوية",
  },
  {
    courseCode: "BMIE 452",
    courseDescription: "الخوارزميات و تطبيقاتها للمعلوماتية الحيوية",
  },
  {
    courseCode: "BMIE 453",
    courseDescription: "مختبر الخوارزميات و تطبيقاتها للمعلوماتية الحيوية",
  },
  { courseCode: "BMIE 455", courseDescription: "مختبر أنظمة قواعد البيانات" },
  { courseCode: "BMIE 498", courseDescription: "مشروع التخرج 1" },
  { courseCode: "BMIE 500", courseDescription: "التدريب الميداني" },
  {
    courseCode: "BMIE 532",
    courseDescription: "تصميم و إدارة أنظمة الرعاية الصحية",
  },
  {
    courseCode: "BMIE 540",
    courseDescription: "الشبكات لأنظمة الرعاية الصحية",
  },
  {
    courseCode: "BMIE 542",
    courseDescription: "أمن وسلامة نظم المعلومات الصحية",
  },
  {
    courseCode: "BMIE 558",
    courseDescription: "برمجة متقدمة في المعلوماتية الحيوية",
  },
  { courseCode: "BMIE 596", courseDescription: "موضوعات خاصة" },
  { courseCode: "BMIE 598", courseDescription: "مشروع التخرج 2" },
  { courseCode: "CPE 230", courseDescription: "المنطق الرقمي" },
  { courseCode: "CPE 231", courseDescription: "مختبر المنطق الرقمي" },
  { courseCode: "CPE 260", courseDescription: "البرمجة والتصميم الكينوني" },
  {
    courseCode: "CPE 260L",
    courseDescription: "مختبر البرمجة والتصميم الكينوني",
  },
  { courseCode: "CPE 310", courseDescription: "التحليلات العددية في الهندسة" },
  { courseCode: "CME 312", courseDescription: "الإشارات والنظم" },
  {
    courseCode: "CME 314",
    courseDescription: "الاحتمالات والعمليات العشوائية في الهندسة",
  },
  {
    courseCode: "CPE 344",
    courseDescription: "تصميم نظم المعالجات والمتحكمات الدقيقة",
  },
  {
    courseCode: "CPE 345",
    courseDescription: "مختبر تصميم نظم المعالجات والمتحكمات الدقيقة",
  },
  { courseCode: "CPE 354", courseDescription: "هيكلة البيانات والخوارزميات" },
  {
    courseCode: "CPE 354L",
    courseDescription: "مختبر هيكلة البيانات والخوارزميات",
  },
  { courseCode: "CPE 442", courseDescription: "بناء وتنظيم الحاسوب" },
  { courseCode: "CPE 450", courseDescription: "تصميم أنظمة قواعد البيانات" },
  {
    courseCode: "CPE 450L",
    courseDescription: "مختبر تصميم أنظمة قواعد البيانات",
  },
  { courseCode: "CME 456", courseDescription: "أنظمة الاتصالات" },
  { courseCode: "CPE 460", courseDescription: "تصميم أنظمة تشغيل الحاسوب" },
  {
    courseCode: "CPE 460L",
    courseDescription: "مختبر تصميم أنظمة تشغيل الحاسوب",
  },
  { courseCode: "CME 462", courseDescription: "تراسل البيانات" },
  { courseCode: "CPE 570", courseDescription: "المعالجات المتوازية" },
  { courseCode: "AE 114", courseDescription: "الرسم المعماري" },
  { courseCode: "AE 121", courseDescription: "مدخل إلى التصميم المعماري (1)" },
  { courseCode: "AE 214", courseDescription: "الرسم والتصميم بالحاسوب (1)" },
  { courseCode: "AE 221", courseDescription: "التصميم المعماري (1)" },
  { courseCode: "AE 222", courseDescription: "التصميم المعماري (2)" },
  { courseCode: "AE 233", courseDescription: "إنشاء المباني" },
  { courseCode: "AE 243", courseDescription: "تاريخ ونظريات العمارة" },
  { courseCode: "AE 315", courseDescription: "الرسومات التنفيذية" },
  { courseCode: "AE 321", courseDescription: "التصميم المعماري (3)" },
  {
    courseCode: "AE 333",
    courseDescription: "ميكانيكا الإنشاء (لطلبة العمارة)",
  },
  {
    courseCode: "AE 342",
    courseDescription: "السلوك الإنساني في البيئة العمرانية",
  },
  {
    courseCode: "AE 421",
    courseDescription: "التصميم المعماري (5) تصميم حضري",
  },
  {
    courseCode: "AE 451",
    courseDescription: "نظريات التصميم المستدام و العمارة الخضراء",
  },
  {
    courseCode: "AE 473",
    courseDescription: 'فيزياء عمارة "الإضاءة والصوتيات، الحرارة و الرطوبة"',
  },
  { courseCode: "AE 475", courseDescription: "أنظمة ميكانيكية وكهربائية" },
  {
    courseCode: "AE 482",
    courseDescription: "المواصفات والعقود وحساب الكميات",
  },
  { courseCode: "AE 484", courseDescription: "ادارة المشاريع" },
  { courseCode: "AE 500", courseDescription: "التدريب الميداني" },
  { courseCode: "AE 511", courseDescription: "تطبيقات متقدمة بالحاسوب" },
  {
    courseCode: "AE 531",
    courseDescription: "تطبيقات متقدمة في التصميم المعماري والإنشائي (مرسم)",
  },
  {
    courseCode: "AE 542",
    courseDescription: "العمارة في العهد الإسلامي (662-1500 م)",
  },
  { courseCode: "AE 545", courseDescription: "العمارة المحلية" },
  {
    courseCode: "AE 550",
    courseDescription: "قضايا معاصرة في مجال التنسيق المعماري",
  },
  { courseCode: "EPE 220", courseDescription: "دوائر كهربائية 1" },
  { courseCode: "EPE 222", courseDescription: "دوائر كهربائية 2" },
  { courseCode: "EPE 223", courseDescription: "مختبر دوائر كهربائية" },
  { courseCode: "EPE 320", courseDescription: "أنظمة التحكم الآلي" },
  { courseCode: "EPE 321", courseDescription: "مختبر أنظمة التحكم الآلي" },
  { courseCode: "EPE 350", courseDescription: "المحولات وآلات التيار المستمر" },
  { courseCode: "EPE 352", courseDescription: "الكترونيات القوى 1" },
  { courseCode: "EPE 353", courseDescription: "مختبر الكترونيات القوى 1" },
  { courseCode: "EPE 354", courseDescription: "الالات الكهربائية" },
  { courseCode: "EPE 360", courseDescription: "تحليل أنظمة القوى 1" },
  { courseCode: "EPE 440", courseDescription: "أجهزة وقياسات" },
  { courseCode: "EPE 441", courseDescription: "مختبر أجهزة وقياسات" },
  { courseCode: "EPE 452", courseDescription: "آلات التيار المتغير" },
  { courseCode: "EPE 453", courseDescription: "مختبر الآلات الكهربائية" },
  { courseCode: "EPE 460", courseDescription: "تحليل أنظمة القوى 2" },
  {
    courseCode: "EPE 461",
    courseDescription: "مختبر تطبيقات الحاسوب في أنظمة القوى",
  },
  { courseCode: "EPE 462", courseDescription: "وقاية أنظمة القوى" },
  { courseCode: "EPE 463", courseDescription: "مختبر وقاية أنظمة القوى" },
  { courseCode: "EPE 470", courseDescription: "هندسة الضغط العالي 1" },
  { courseCode: "EPE 500", courseDescription: "التدريب الميداني" },
  { courseCode: "EPE 520", courseDescription: "الشبكات الذكية" },
  { courseCode: "EPE 556", courseDescription: "أنظمة القيادة الكهربائية" },
  { courseCode: "EPE 560", courseDescription: "أنظمة التوزيع الكهربائية" },
  { courseCode: "EPE 562", courseDescription: "استقرارية أنظمة القوى والتحكم" },
  { courseCode: "EPE 566", courseDescription: "تصميم أنظمة القوى الكهربائية" },
  { courseCode: "CME 216", courseDescription: "طرق التحليل الهندسي" },
  { courseCode: "CME 310", courseDescription: "التحليلات العددية في الهندسة" },
  { courseCode: "CME 312", courseDescription: "الإشارات والنظم" },
  {
    courseCode: "CME 314",
    courseDescription: "الاحتمالات والعمليات العشوائية في الهندسة",
  },
  { courseCode: "CME 342", courseDescription: "الكهرومغناطيسية الهندسية" },
  {
    courseCode: "CME 442",
    courseDescription: "الأمواج والمجالات الكهرومغناطيسية",
  },
  { courseCode: "CME 450", courseDescription: "الاتصالات التماثلية" },
  { courseCode: "CME 451", courseDescription: "مختبر الاتصالات التماثلية" },
  { courseCode: "CME 452", courseDescription: "الاتصالات الرقمية" },
  { courseCode: "CME 453", courseDescription: "مختبر الاتصالات الرقمية" },
  { courseCode: "CME 454", courseDescription: "معالجة الإشارة الرقمية" },
  { courseCode: "CME 455", courseDescription: "مختبر معالجة الإشارة الرقمية" },
  { courseCode: "CME 456", courseDescription: "انظمة الاتصالات" },
  { courseCode: "CME 457", courseDescription: "مختبر انظمة الاتصالات" },
  { courseCode: "CME 460", courseDescription: "اتصالات الألياف الضوئية" },
  { courseCode: "CME 461", courseDescription: "مختبر اتصالات الألياف الضوئية" },
  { courseCode: "CME 462", courseDescription: "تراسل البيانات" },
  { courseCode: "CME 500", courseDescription: "التدريب الميداني" },
  { courseCode: "CME 548", courseDescription: "الهوائيات وانتشار الأمواج" },
  { courseCode: "CME 549", courseDescription: "مختبر الهوائيات والميكرويف" },
  { courseCode: "CME 556", courseDescription: "النقل في أنظمة الاتصالات" },
  { courseCode: "CME 568", courseDescription: "أنظمة الاتصالات المتحركة" },
  {
    courseCode: "ELE 202",
    courseDescription: "الرسم الهندسي باستخدام الحاسوب",
  },
  {
    courseCode: "ELE 206",
    courseDescription: "الكتابة التقنية وأخلاقيات الهندسة",
  },
  { courseCode: "ELE 220", courseDescription: "الدوائر الالكترونية" },
  { courseCode: "ELE 250", courseDescription: "الكترونيات (1)" },
  { courseCode: "ELE 251", courseDescription: "مختبر الكترونيات (1)" },
  { courseCode: "ELE 340", courseDescription: "الكترونيات اشباه الموصلات" },
  { courseCode: "ELE 350", courseDescription: "الكترونيات (2)" },
  { courseCode: "ELE 351", courseDescription: "مختبر الكترونيات (2)" },
  { courseCode: "ELE 352", courseDescription: "التصميم والتصنيع الالكتروني" },
  {
    courseCode: "ELE 353",
    courseDescription: "مختبر التصميم والتصنيع الالكتروني",
  },
  { courseCode: "ELE 402", courseDescription: "التصميم بمساعدة الحاسوب" },
  { courseCode: "ELE 440", courseDescription: "البصريات الالكترونية" },
  {
    courseCode: "ELE 448",
    courseDescription: "مقدمه في تصميم الدوائر المتكاملة ذات النطاق الواسع",
  },
  { courseCode: "ELE 449", courseDescription: "تصميم دارات التكامل الفائقة" },
  { courseCode: "ELE 450", courseDescription: "الالكترونيات الرقمية" },
  { courseCode: "ELE 451", courseDescription: "مختبر الالكترونيات الرقمية" },
  { courseCode: "ELE 452", courseDescription: "الدوائر المتكاملة" },
  { courseCode: "ELE 454", courseDescription: "القياسات التخصصية" },
  { courseCode: "ELE 455", courseDescription: "مختبر القياسات التخصصية" },
  { courseCode: "ELE 456", courseDescription: "الكترونيات (3)" },
  { courseCode: "ELE 458", courseDescription: "مصادر الجهد و المنظمات" },
  { courseCode: "ELE 500", courseDescription: "التدريب الميداني" },
  {
    courseCode: "ELE 551",
    courseDescription: "مختبر الصيانة الالكترونية و الحاسوب",
  },
  { courseCode: "ELE 574", courseDescription: "الكترونيات الاتصالات" },
  { courseCode: "ME 228", courseDescription: "مختبر ميكانيكا المواد" },
  {
    courseCode: "ME 422",
    courseDescription: "مختبر والاهتزازات و نظرية الالات",
  },
  { courseCode: "ME 341", courseDescription: "مكانيكا الموائع" },
  { courseCode: "ME 227", courseDescription: "ميكانيكا المواد" },
  { courseCode: "ME 207", courseDescription: "رسم الالات بالحاسوب" },
  { courseCode: "ME 326", courseDescription: "نظرية الالات" },
  { courseCode: "ME 202", courseDescription: "الديناميكا" },
  { courseCode: "ME 425", courseDescription: "تصميم الميكانيكي (2)" },
  { courseCode: "ME 428", courseDescription: "الهندسة العكسية" },
  { courseCode: "ME 353", courseDescription: "انتقال حرارة" },
  { courseCode: "ME 524", courseDescription: "مقدمة في تصميم السيارات" },
  { courseCode: "ME 521", courseDescription: "تريبولوجي" },
  { courseCode: "ME 562", courseDescription: "ميكانيكا المواد المركبة" },
  { courseCode: "CE 200", courseDescription: "الرسم الهندسي" },
  { courseCode: "CE 201", courseDescription: "ستاتيكا" },
  { courseCode: "CE 202", courseDescription: "ديناميكا" },
  { courseCode: "CE 203", courseDescription: "مقاومة المواد" },
  { courseCode: "CE 206", courseDescription: "ميكانيكا هندسية" },
  {
    courseCode: "CE 210",
    courseDescription: "الإحصاء والاحتمالات لطلبة الهندسة",
  },
  { courseCode: "CE 261", courseDescription: "جيولوجيا هندسية" },
  { courseCode: "CE 262", courseDescription: "جيولوجيا" },
  { courseCode: "CE 321", courseDescription: "علم المواد" },
  { courseCode: "CE 323", courseDescription: "مواد الإنشاء" },
  { courseCode: "CE 326", courseDescription: "مختبر مواد الانشاء" },
  { courseCode: "CE 331", courseDescription: "انشاء المباني" },
  { courseCode: "CE 332", courseDescription: "تحليل انشائي 1" },
  { courseCode: "CE 341", courseDescription: "المساحــه" },
  { courseCode: "CE 343", courseDescription: "مختبر المساحـــه" },
  { courseCode: "CE 345", courseDescription: "هندسة المواصلات" },
  {
    courseCode: "CE 351",
    courseDescription: "ميكانيكا الموائع للهندسة المدنية",
  },
  { courseCode: "CE 352", courseDescription: "الهيدروليكا والهيدرولجيا" },
  {
    courseCode: "CE 354",
    courseDescription: "مختبر ميكانيكا الموائع والهيدروليكا",
  },
  { courseCode: "CE 362", courseDescription: "هندسة التربه" },
  { courseCode: "CE 363", courseDescription: "مختبر هندسة التربه" },
  { courseCode: "CE 364", courseDescription: "الهندسة الجيوتقنية" },
  { courseCode: "CE 370", courseDescription: "الإدارة والاقتصاد الهندسي" },
  { courseCode: "CE 371", courseDescription: "الإدارة والاقتصاد الهندسي" },
  { courseCode: "CE 431", courseDescription: "تحليل انشائي 2" },
  { courseCode: "CE 432", courseDescription: "خرسانه مسلحه 1" },
  { courseCode: "CE 434", courseDescription: "تصميم منشآت معدنيه" },
  { courseCode: "MATH 101", courseDescription: "تفاضل وتكامل (1)" },
  { courseCode: "MATH 102", courseDescription: "تفاضل وتكامل (2)" },
  { courseCode: "MATH 201", courseDescription: "تحليل وسيــط (1)" },
  { courseCode: "SCC 255", courseDescription: "معادلات تفاضلية عادية" },
  { courseCode: "MATH 241", courseDescription: "جبـر خطـي (1)" },
  { courseCode: "MATH 152", courseDescription: "الرياضيات المتقطعة" },
];
export default function AddlabelForm() {
  const [formData, setFormData] = useState({
    name: "",
    course_code: "",
    label: "",
    category: "كتب",
    link: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const courseName = (code) => {
    const course = courseNameMap.find(
      (c) => c.courseCode.replace(" ", "") === code
    );
    return course ? course.courseDescription : " ";
  };
  const specializeValue = (value) => {
    if (!value) return " ";

    const found = specializationMap.find(({ key }) => value.includes(key));
    return found ? found.specialization : " ";
  };
  const categoryValue = (value) => {
    const found = categoryMap.find(({ key }) => value === key);
    return found ? found.label : "";
  };
  const generateID = (code) => {
    return parseInt(new Date().getTime() + code.replace(/\D/g, ""), 10);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUBABASE_URL,
      process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY
    );

    try {
      const code = formData.course_code
        .trim()
        .replaceAll(" ", "")
        .toUpperCase();
      const course_name = courseName(code);
      const specialize = specializeValue(code) || " ";
      const category = categoryValue(formData.category);
      const ID = generateID(code);
      console.log(code, specialize, category, ID);
      const { data: links, error: fetchError } = await supabase
        .from("Courses")
        .select("*")
        .eq("course_code", code);
      const { data: links2, error: fetchError2 } = await supabase
        .from("Courses")
        .select("*")
        .eq("course_code", code);
      if (fetchError) throw fetchError;
      if (fetchError2) throw fetchError2;
      if (links.length === 0 && links2.length === 0) {
        const { error: insertCourseError } = await supabase
          .from("Courses")
          .insert([
            {
              course_code: code,
              specialize: specialize,
              course_name: course_name,
              description: "",
            },
          ]);
        if (insertCourseError) throw insertCourseError;
      }

      const { error: insertLinkError } = await supabase.from("Links").insert([
        {
          course_code: code,
          add_by: formData.name,
          id: ID,
          label: formData.label,
          category: category || "كتب",
          link: formData.link,
        },
      ]);

      if (insertLinkError) throw insertLinkError;

      console.log("Data submitted successfully");

      setFormData({
        ...formData,
        link: "",
        label: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };
  return (
    <div className="flex w-full max-w-[1000px] mt-5 px-4 flex-col items-center">
      <h1 className="text-3xl ">!ساهم الآن</h1>
      <h2 className="text-lg opacity-85">أضف صدقة جارية تسجل باسمك</h2>
      <form
        className="w-[70%]"
        action="https://fabform.io/f/{form-id}"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-end text-[#07074D]"
          >
            الاسم
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="(اختياري)اسمك الكامل"
            value={formData.name}
            onChange={handleChange}
            className="w-full text-end shadow-lg rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="course_code"
            className="mb-3 block text-end text-base font-medium text-[#07074D]"
          >
            رمز المادة
          </label>
          <input
            required
            type="text"
            name="course_code"
            id="course_code"
            placeholder=" (CPE150) مثال"
            value={formData.course_code}
            onChange={handleChange}
            className="w-full text-end rounded-md shadow-lg border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="label"
            className="mb-3 text-end block text-base font-medium text-[#07074D]"
          >
            وصف المحتوى
          </label>
          <input
            required
            type="text"
            name="label"
            id="label"
            placeholder="وصف المحتوى مثال (مانيوال المادة)"
            value={formData.label}
            onChange={handleChange}
            className="w-full rounded-md text-end border shadow-lg border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="text-center w-full">
          <label
            htmlFor="category"
            className="mb-3 text-end block text-base font-medium text-[#07074D]"
          >
            فئة المحتوى
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            required
            onChange={handleChange}
            className="w-full text-end rounded-md shadow-lg border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option className=" cursor-pointer" value="0">
              كتب
            </option>
            <option className=" cursor-pointer" value="1">
              فيديو
            </option>
            <option className=" cursor-pointer" value="2">
              سلايدات
            </option>
            <option className=" cursor-pointer" value="3">
              سنوات
            </option>
            <option className=" cursor-pointer" value="4">
              مصادر طلابية
            </option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="link"
            className="mb-3 mt-4 text-end block text-base font-medium text-[#07074D]"
          >
            الرابط
          </label>
          <textarea
            rows="4"
            required
            name="link"
            id="link"
            placeholder="رابط واحد في كل مرة (اذا لم يكن لديك رابط أضف الرابط على جوجل درايف وتاكد أنه عام)"
            value={formData.link}
            onChange={handleChange}
            className="w-full resize-none shadow-lg text-end rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
        </div>
        <div className="w-full  flex justify-center">
          <button
            type="submit"
            className="hover:shadow-form shadow-lg rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
