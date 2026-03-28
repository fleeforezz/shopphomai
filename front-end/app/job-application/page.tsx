'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from "../job-application.module.css";

interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  from: string;
  to: string;
  gpa: string;
}

interface Experience {
  id: number;
  company: string;
  title: string;
  from: string;
  to: string;
  desc: string;
  reason: string;
  salary: string;
}

export default function JobApplicationPage() {
  const [eduList, setEduList] = useState<Education[]>([{ id: 1, school: '', degree: '', major: '', from: '', to: '', gpa: '' }]);
  const [expList, setExpList] = useState<Experience[]>([{ id: 1, company: '', title: '', from: '', to: '', desc: '', reason: '', salary: '' }]);
  const [eduCount, setEduCount] = useState(1);
  const [expCount, setExpCount] = useState(1);
  const [fileName, setFileName] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [isOver, setIsOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Removed useEffect initialization to prevent duplicate key warnings in Strict Mode

  const addEdu = () => {
    setEduCount(prev => {
      const newId = prev + 1;
      setEduList(list => [...list, { id: newId, school: '', degree: '', major: '', from: '', to: '', gpa: '' }]);
      return newId;
    });
  };

  const removeEdu = (id: number) => {
    setEduList(list => list.filter(item => item.id !== id));
  };

  const addExp = () => {
    setExpCount(prev => {
      const newId = prev + 1;
      setExpList(list => [...list, { id: newId, company: '', title: '', from: '', to: '', desc: '', reason: '', salary: '' }]);
      return newId;
    });
  };

  const removeExp = (id: number) => {
    setExpList(list => list.filter(item => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
        setFileName(e.dataTransfer.files[0].name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const requiredElements = form.querySelectorAll('[required]') as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    const newInvalidFields = new Set<string>();
    let firstInvalid: HTMLElement | null = null;

    requiredElements.forEach(el => {
      const isInvalid = !el.value.trim() || (el.type === 'checkbox' && !(el as HTMLInputElement).checked);
      if (isInvalid) {
        newInvalidFields.add(el.name || el.id);
        if (!firstInvalid) firstInvalid = el;
      }
    });

    setInvalidFields(newInvalidFields);

    if (newInvalidFields.size > 0) {
      (firstInvalid as HTMLElement | null)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 4000);
    }, 1600);
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setEduList([{ id: 1, school: '', degree: '', major: '', from: '', to: '', gpa: '' }]);
    setExpList([{ id: 1, company: '', title: '', from: '', to: '', desc: '', reason: '', salary: '' }]);
    setEduCount(1);
    setExpCount(1);
    setFileName('');
    setInvalidFields(new Set());
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoRing}>👗</div>
          <div>
            <div className={styles.brand}>ShopPhomai <span>/ Careers</span></div>
          </div>
        </div>
      </header>

      {/* JOB DESCRIPTION */}
      <section className={styles.jdWrap}>
        <div className={styles.jdDoc}>
          <div className={styles.jdTitlebar}>
            <h1>[SHOPPHOMAI] TUYỂN DỤNG FASHION RETAIL ASSOCIATE</h1>
          </div>

          <div className={styles.jdSectionLabel}>
            <p>Thông tin tuyển dụng</p>
          </div>

          <div className={styles.jdMetaRow}>
            <div className={styles.jdChip}>📍 Hồ Chí Minh — On-site</div>
            <div className={styles.jdChip}>💼 Full-time</div>
            <div className={styles.jdChip}>💰 8–14 triệu VND / tháng</div>
            <div className={styles.jdChip}>🎓 0–2 năm kinh nghiệm</div>
          </div>

          <div className={styles.jdBody}>
            <div className={styles.jdSec}>
              <div className={styles.jdSecTitle}><span className={styles.ico}>🏪</span> VỀ SHOPPHOMAI</div>
              <p className={styles.jdPara}>ShopPhomai là thương hiệu thời trang đa phong cách được thành lập tại Việt Nam. Chúng tôi chú trọng vào việc mang đến cho khách hàng những sản phẩm chất lượng, phù hợp với xu hướng và phong cách sống hiện đại.</p>
              <p className={styles.jdPara}>Với triết lý <strong>"No Dress Code"</strong>, ShopPhomai khuyến khích mỗi cá nhân thể hiện phong cách riêng. Chúng tôi đang mở rộng đội ngũ nhân viên bán lẻ chuyên nghiệp, nhiệt huyết để cùng phát triển.</p>
            </div>

            <div className={styles.jdSec}>
              <div className={styles.jdSecTitle}><span className={styles.ico}>👤</span> BẠN LÀ NGƯỜI</div>
              <div className={styles.jdSub}>Về bán hàng & tư vấn:</div>
              <ul className={styles.jdList}>
                <li>Chào đón và tư vấn khách hàng tại cửa hàng, hỗ trợ phối đồ và <strong>tìm kiếm phong cách phù hợp</strong></li>
                <li>Duy trì trưng bày sản phẩm gọn gàng, đúng tiêu chuẩn <strong>visual merchandising</strong></li>
                <li>Xử lý giao dịch qua POS, quản lý <strong>đổi trả hàng</strong> theo quy trình</li>
                <li>Chủ động tiếp cận khách và xây dựng <strong>mối quan hệ thân thiết</strong> với khách hàng thân thiết</li>
              </ul>
              <div className={styles.jdSub}>Về vận hành cửa hàng:</div>
              <ul className={styles.jdList}>
                <li>Kiểm soát tồn kho, báo cáo số lượng hàng và phối hợp với <strong>kho nội bộ</strong></li>
                <li>Tham gia nhận hàng, gắn tag, phân loại sản phẩm đúng vị trí trên sàn</li>
                <li>Thực hiện kiểm kê định kỳ và hoàn thành <strong>chỉ tiêu doanh số</strong> cá nhân & team</li>
              </ul>
            </div>

            <div className={styles.jdSec}>
              <div className={styles.jdSecTitle}><span className={styles.ico}>📋</span> YÊU CẦU</div>
              <p className={styles.jdPara}>Từ 0–2 năm kinh nghiệm trong lĩnh vực bán lẻ thời trang hoặc dịch vụ khách hàng. Ứng viên mới ra trường được chào đón.</p>
              <div className={styles.jdSub}>Về kiến thức:</div>
              <ul className={styles.jdList}>
                <li>Tốt nghiệp THPT trở lên; ưu tiên có chuyên ngành <strong>thời trang, kinh doanh hoặc quản trị</strong></li>
                <li>Am hiểu cơ bản về <strong>xu hướng thời trang</strong> và phong cách phối đồ</li>
                <li>Biết sử dụng phần mềm POS và các ứng dụng văn phòng cơ bản</li>
              </ul>
              <div className={styles.jdSub}>Về kỹ năng:</div>
              <ul className={styles.jdList}>
                <li>Giao tiếp tốt, thân thiện, có khả năng <strong>làm việc nhóm</strong> và chịu áp lực</li>
                <li>Năng động, chỉnh chu trong ngoại hình và tác phong làm việc</li>
                <li>Sẵn sàng làm việc <strong>cuối tuần & ngày lễ</strong> theo lịch xoay ca</li>
                <li>Ưu tiên ứng viên có khả năng giao tiếp <strong>tiếng Anh cơ bản</strong></li>
              </ul>
            </div>

            <div className={styles.jdSec}>
              <div className={styles.jdSecTitle}><span className={styles.ico}>📅</span> THỜI GIAN VÀ ĐỊA ĐIỂM LÀM VIỆC</div>
              <ul className={styles.jdList}>
                <li>Giờ làm việc: Toàn thời gian, xoay ca <strong>Thứ 2 – Thứ 6</strong> (8h – 17h30), nghỉ trưa 12h–13h</li>
                <li>Địa điểm làm việc: <strong>Số 37 Nguyễn Thị Diệu, Phường Xuân Hòa, TP. HCM, Việt Nam</strong></li>
              </ul>
            </div>

            <div className={styles.jdSec}>
              <div className={styles.jdSecTitle}><span className={styles.ico}>🎁</span> QUYỀN LỢI</div>
              <div className={styles.jdBenefitGroup}>
                <div className={styles.jdBenefitTitle}>A. Lương & Phúc Lợi</div>
                <ul className={styles.jdList}>
                  <li>Mức lương cạnh tranh từ <strong>8–14 triệu VND/tháng</strong> tùy năng lực</li>
                  <li>Thưởng & đánh giá: Tháng 13, thưởng các ngày Lễ/Tết theo quy định. Xét tăng lương (Review performance) 02 lần/năm vào tháng 1 và tháng 7</li>
                </ul>
              </div>
              <div className={styles.jdBenefitGroup}>
                <div className={styles.jdBenefitTitle}>B. Đãi ngộ hấp dẫn</div>
                <ul className={styles.jdList}>
                  <li>Chiết khấu mua hàng nội bộ với ưu đãi lên đến <strong>30%</strong></li>
                  <li>Quà tặng sinh nhật trị giá <strong>1.000.000 VNĐ</strong></li>
                  <li>Chế độ hiếu hỷ, chăm sóc đời sống nhân viên tận tâm</li>
                  <li>Tham gia BHXH đầy đủ, ký hợp đồng chính thức, hưởng 12 ngày phép/năm theo Luật lao động</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className={styles.dividerSection}>
        <div className={styles.stepDivider}>
          <div className={styles.stepLabel}><div className={styles.num}>1</div> Your Application</div>
          <hr />
        </div>
      </div>

      {/* APPLICATION FORM */}
      <section className={styles.formSection}>
        <h2>Personal Information</h2>
        <p className={styles.sub}>Please fill in all fields carefully. Your information is kept confidential.</p>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>
            <div className={styles.formGroupTitle}><h3>Basic Info</h3><hr /></div>

            <div className={`${styles.field} ${invalidFields.has('fullName') ? styles.invalid : ''}`}>
              <label htmlFor="fullName">Full Name *</label>
              <input id="fullName" name="fullName" type="text" placeholder="e.g. Nguyen Thi Lan" required />
            </div>

            <div className={`${styles.field} ${invalidFields.has('phone') ? styles.invalid : ''}`}>
              <label htmlFor="phone">Phone Number *</label>
              <input id="phone" name="phone" type="tel" placeholder="e.g. 0901 234 567" required />
            </div>

            <div className={`${styles.field} ${invalidFields.has('email') ? styles.invalid : ''}`}>
              <label htmlFor="email">Email Address *</label>
              <input id="email" name="email" type="email" placeholder="e.g. lan.nguyen@email.com" required />
            </div>

            <div className={`${styles.field} ${invalidFields.has('dob') ? styles.invalid : ''}`}>
              <label htmlFor="dob">Date of Birth *</label>
              <input id="dob" name="dob" type="date" required />
            </div>

            <div className={styles.field}>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender">
                <option value="">— Select —</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="nationality">Nationality</label>
              <input id="nationality" name="nationality" type="text" placeholder="e.g. Vietnamese" />
            </div>

            <div className={`${styles.field} ${styles.full} ${invalidFields.has('address') ? styles.invalid : ''}`}>
              <label htmlFor="address">Current Address *</label>
              <input id="address" name="address" type="text" placeholder="Street, Ward, District, City" required />
            </div>

            <div className={styles.formGroupTitle}><h3>Position & Availability</h3><hr /></div>

            <div className={`${styles.field} ${invalidFields.has('position') ? styles.invalid : ''}`}>
              <label htmlFor="position">Position Applied For *</label>
              <select id="position" name="position" required tabIndex={0}>
                <option value="">— Select —</option>
                <option>Fashion Retail Associate</option>
                <option>Senior Retail Associate</option>
                <option>Visual Merchandiser</option>
                <option>Store Supervisor</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="startDate">Earliest Start Date</label>
              <input id="startDate" name="startDate" type="date" />
            </div>

            <div className={styles.field}>
              <label htmlFor="availability">Shift Availability</label>
              <select id="availability" name="availability">
                <option value="">— Select —</option>
                <option>Full-time (any shift)</option>
                <option>Morning shift only</option>
                <option>Evening shift only</option>
                <option>Weekends only</option>
                <option>Part-time flexible</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="salary">Expected Salary (VND/month)</label>
              <input id="salary" name="salary" type="number" placeholder="e.g. 9000000" min="0" step="500000" />
            </div>

            <div className={styles.formGroupTitle}><h3>Education</h3><hr /></div>
            <div className={styles.dynSection}>
              {eduList.map((edu) => (
                <div key={`edu-${edu.id}`} className={`${styles.dynRow} ${styles.eduRow}`}>
                  <button type="button" className={styles.removeBtn} onClick={() => removeEdu(edu.id)} title="Remove">✕</button>
                  <div className={styles.field}>
                    <label>School / University</label>
                    <input type="text" name={`edu_school_${edu.id}`} placeholder="e.g. HCMC University of Tech" />
                  </div>
                  <div className={styles.field}>
                    <label>Degree / Level</label>
                    <select name={`edu_degree_${edu.id}`}>
                      <option value="">— Select —</option>
                      <option>High School Diploma</option>
                      <option>Vocational Certificate</option>
                      <option>Associate&apos;s Degree</option>
                      <option>Bachelor&apos;s Degree</option>
                      <option>Master&apos;s Degree</option>
                      <option>PhD</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Major / Field</label>
                    <input type="text" name={`edu_major_${edu.id}`} placeholder="e.g. Fashion Design" />
                  </div>
                  <div className={styles.field}>
                    <label>From</label>
                    <input type="month" name={`edu_from_${edu.id}`} />
                  </div>
                  <div className={styles.field}>
                    <label>To</label>
                    <input type="month" name={`edu_to_${edu.id}`} />
                  </div>
                  <div className={styles.field}>
                    <label>GPA / Grade (optional)</label>
                    <input type="text" name={`edu_gpa_${edu.id}`} placeholder="e.g. 3.5 / 4.0" />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <button type="button" className={styles.addBtn} onClick={addEdu}>
                <span className={styles.plus}>+</span> Add Education
              </button>
            </div>

            <div className={styles.formGroupTitle}><h3>Work Experience</h3><hr /></div>
            <div className={styles.dynSection}>
              {expList.map((exp) => (
                <div key={`exp-${exp.id}`} className={`${styles.dynRow} ${styles.expRow}`}>
                  <button type="button" className={styles.removeBtn} onClick={() => removeExp(exp.id)} title="Remove">✕</button>
                  <div className={styles.field}>
                    <label>Company</label>
                    <input type="text" name={`exp_company_${exp.id}`} placeholder="e.g. Zara Vietnam" />
                  </div>
                  <div className={styles.field}>
                    <label>Job Title</label>
                    <input type="text" name={`exp_title_${exp.id}`} placeholder="e.g. Sales Associate" />
                  </div>
                  <div className={styles.field}>
                    <label>From</label>
                    <input type="month" name={`exp_from_${exp.id}`} />
                  </div>
                  <div className={styles.field}>
                    <label>To</label>
                    <input type="month" name={`exp_to_${exp.id}`} placeholder="Leave blank if current" />
                  </div>
                  <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                    <label>Key Responsibilities</label>
                    <input type="text" name={`exp_desc_${exp.id}`} placeholder="Brief description of your role…" />
                  </div>
                  <div className={styles.field}>
                    <label>Reason for Leaving</label>
                    <input type="text" name={`exp_reason_${exp.id}`} placeholder="Optional" />
                  </div>
                  <div className={styles.field}>
                    <label>Salary (VND)</label>
                    <input type="number" name={`exp_salary_${exp.id}`} placeholder="e.g. 8000000" step="500000" min="0" />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <button type="button" className={styles.addBtn} onClick={addExp}>
                <span className={styles.plus}>+</span> Add Experience
              </button>
            </div>

            <div className={styles.formGroupTitle}><h3>About You</h3><hr /></div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="skills">Skills & Strengths</label>
              <input id="skills" name="skills" type="text" placeholder="e.g. Customer service, Styling, POS systems, Vietnamese & English" />
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="bio">Tell Us About Yourself</label>
              <textarea id="bio" name="bio" placeholder="Share your passion for fashion, key achievements, or anything that makes you stand out…"></textarea>
            </div>

            <div className={styles.formGroupTitle}><h3>Documents</h3><hr /></div>
            <label 
              className={`${styles.uploadZone} ${isOver ? styles.over : ''}`} 
              onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
              onDragEnter={(e) => { e.preventDefault(); setIsOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsOver(false); }}
              onDrop={handleDrop}
              htmlFor="cvFile"
            >
              <input type="file" id="cvFile" name="cvFile" accept=".pdf,.doc,.docx,.jpg,.png" ref={fileInputRef} onChange={handleFileChange} />
              <div className={styles.uploadIcon}>📄</div>
              <p><strong>Click to upload CV / Portfolio</strong><br />PDF, DOC, DOCX or images · Max 5 MB</p>
              <div className={`${styles.fileName} ${fileName ? styles.visible : ''}`}>
                ✔ <span>{fileName}</span>
              </div>
            </label>

            <div className={`${styles.agreeRow} ${invalidFields.has('agree') ? styles.invalid : ''}`}>
              <input type="checkbox" id="agree" name="agree" required />
              <label htmlFor="agree">I confirm that all information provided is accurate and I agree to ShopPhomai&apos;s <a href="#">Privacy Policy</a> and <a href="#">Terms of Application</a>.</label>
            </div>

            <div className={styles.submitRow}>
              <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Submit Application →'}
              </button>
              <button type="button" className={styles.btnOutline} onClick={resetForm}>Clear Form</button>
            </div>
          </div>
        </form>
      </section>

      {/* SUCCESS TOAST */}
      <div className={`${styles.toast} ${isToastVisible ? styles.show : ''}`}>
        <span className={styles.check}>✔</span>
        <div>
          <strong>Application Submitted!</strong><br />
          <span style={{ color: 'var(--muted)', fontSize: '.82rem' }}>We&apos;ll reach out within 3–5 business days.</span>
        </div>
      </div>
    </div>
  );
}
