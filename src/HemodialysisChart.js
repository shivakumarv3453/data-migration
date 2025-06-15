import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HemodialysisChart.css";
import LabReportTracker from "./LabReportTracker";

// Patient profiles database
const patientProfiles = {
  patient1: {
    patientName: "Kumar Das",
    age: 69,
    gender: "Male",
    uhidNo: "1508604652",
    consultantName: "Dr. Ganesh N S",
    dryWeight: 56.0,
    dialysisType: "HD",
    dialysisUse: "Single Use",
    machineNumber: "M-4",
    accessTypes: ["avf"],
    heparinBolus: 2000,
    heparinFollowed: 1000
  },
  patient2: {
    patientName: "Priya Sharma",
    age: 45,
    gender: "Female",
    uhidNo: "1508604653",
    consultantName: "Dr. Rajesh Kumar",
    dryWeight: 52.5,
    dialysisType: "HDF",
    dialysisUse: "Single Use",
    machineNumber: "M-2",
    accessTypes: ["permCath"],
    heparinBolus: 1500,
    heparinFollowed: 800
  },
  patient3: {
    patientName: "Rajesh Patel",
    age: 58,
    gender: "Male",
    uhidNo: "1508604654",
    consultantName: "Dr. Ganesh N S",
    dryWeight: 68.2,
    dialysisType: "HD",
    dialysisUse: "Reuse",
    machineNumber: "M-1",
    accessTypes: ["jugular"],
    heparinBolus: 2500,
    heparinFollowed: 1200
  },
  patient4: {
    patientName: "Sunita Devi",
    age: 62,
    gender: "Female",
    uhidNo: "1508604655",
    consultantName: "Dr. Priya Singh",
    dryWeight: 48.8,
    dialysisType: "HD",
    dialysisUse: "Single Use",
    machineNumber: "M-3",
    accessTypes: ["avf"],
    heparinBolus: 1800,
    heparinFollowed: 900
  },
  patient5: {
    patientName: "Mohammed Khan",
    age: 54,
    gender: "Male",
    uhidNo: "1508604656",
    consultantName: "Dr. Ahmed Hassan",
    dryWeight: 72.1,
    dialysisType: "HDF",
    dialysisUse: "Single Use",
    machineNumber: "M-5",
    accessTypes: ["permCath"],
    heparinBolus: 2200,
    heparinFollowed: 1100
  }
};

const initialVitals = [
  { time: "", bp: "", pulse: "", temperature: "", bloodPump: "", vp: "", netUf: "", heparin: "", remarks: "" }
];

const nonNegative = (setter) => (val) => {
  if (val === "" || Number(val) >= 0) setter(val);
};

export default function HemodialysisChart() {
  // Patient Info
  const [selectedProfile, setSelectedProfile] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [uhidNo, setUhidNo] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [treatmentDate, setTreatmentDate] = useState(() => new Date().toISOString().split("T")[0]);

  // Weight Management
  const [weightGain, setWeightGain] = useState("");
  const [dryWeight, setDryWeight] = useState("");
  const [preHdWeight, setPreHdWeight] = useState("");
  const [postHdWeight, setPostHdWeight] = useState("");
  const [ufGoal, setUfGoal] = useState("");
  const [ufActual, setUfActual] = useState("");

  // Dialysis Details
  const [dialysisCount, setDialysisCount] = useState("");
  const [dialysisType, setDialysisType] = useState("");
  const [dialysisUse, setDialysisUse] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [machineStart, setMachineStart] = useState("");
  const [machineEnd, setMachineEnd] = useState("");

  // Access & Heparin
  const [accessTypes, setAccessTypes] = useState([]);
  const [heparinBolus, setHeparinBolus] = useState("");
  const [heparinFollowed, setHeparinFollowed] = useState("");

  // Vitals
  const [vitals, setVitals] = useState(initialVitals);

  // Pre HD Checklist
  const [chartsChecked, setChartsChecked] = useState(false);
  const [injectionsListed, setInjectionsListed] = useState(false);
  const [investigationsListed, setInvestigationsListed] = useState(false);
  const [heparinChecked, setHeparinChecked] = useState(false);

  // Staff Info
  const [startedBy, setStartedBy] = useState("");
  const [assistedBy, setAssistedBy] = useState("");

  // Success Message
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle patient profile selection
  const handleProfileChange = (e) => {
    const val = e.target.value;
    setSelectedProfile(val);
    if (val && patientProfiles[val]) {
      const profile = patientProfiles[val];
      setPatientName(profile.patientName);
      setAge(profile.age);
      setGender(profile.gender);
      setUhidNo(profile.uhidNo);
      setConsultantName(profile.consultantName);
      setDryWeight(profile.dryWeight);
      setDialysisType(profile.dialysisType);
      setDialysisUse(profile.dialysisUse);
      setMachineNumber(profile.machineNumber);
      setHeparinBolus(profile.heparinBolus);
      setHeparinFollowed(profile.heparinFollowed);
      setAccessTypes(profile.accessTypes);
    }
  };

  // Handle access type checkboxes
  const handleAccessChange = (type) => {
    setAccessTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Handle vitals table
  const addVitalsRow = () => {
    setVitals([
      ...vitals,
      { time: "", bp: "", pulse: "", temperature: "", bloodPump: "", vp: "", netUf: "", heparin: "", remarks: "" }
    ]);
  };
  const handleVitalsChange = (idx, field, value) => {
    setVitals((prev) =>
      prev.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patientName, age, gender, uhidNo, consultantName, treatmentDate,
      weightGain, dryWeight, preHdWeight, postHdWeight, ufGoal, ufActual,
      dialysisCount, dialysisType, dialysisUse, machineNumber, machineStart, machineEnd,
      accessTypes, heparinBolus, heparinFollowed,
      vitals,
      preHdChecklist: {
        chartsChecked, injectionsListed, investigationsListed, heparinChecked
      },
      startedBy, assistedBy
    };
    // Download as JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hemodialysis_chart_${patientName || "patient"}_${treatmentDate || new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="form-content">
      <div className="header">
        <div className="hospital-logo">🏥 SPARSH HOSPITAL</div>
        <h2 id="headerTitle">HEMODIALYSIS TREATMENT SYSTEM</h2>
        <p>"THE TOUCH OF LIFE"</p>
          <button
            className="logout-btn"
            id="logoutBtn"
            onClick={()=>navigate("/login")}
          >
            ← Logout
          </button>
        
      </div>
      <button
        type="button"
        className="add-table-btn"
        style={{ marginBottom: "1rem" }}
        onClick={() => navigate("/lab-report")}
      >
        ➕ Add Table Data
      </button>
      <form onSubmit={handleSubmit}>
        {/* Patient Information */}
        <div className="patient-info">
          <div className="form-group">
            <label>Select Patient Profile</label>
            <select value={selectedProfile} onChange={handleProfileChange}>
              <option value="">-- Select Existing Patient --</option>
              <option value="patient1">Kumar Das (UHID: 1508604652)</option>
              <option value="patient2">Priya Sharma (UHID: 1508604653)</option>
              <option value="patient3">Rajesh Patel (UHID: 1508604654)</option>
              <option value="patient4">Sunita Devi (UHID: 1508604655)</option>
              <option value="patient5">Mohammed Khan (UHID: 1508604656)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Patient Name</label>
            <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Enter patient name" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" value={age} onChange={e => nonNegative(setAge)(e.target.value)} placeholder="Age" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>UHID/IP No.</label>
            <input type="text" value={uhidNo} onChange={e => setUhidNo(e.target.value)} placeholder="UHID/IP Number" />
          </div>
          <div className="form-group">
            <label>Consultant Name</label>
            <input type="text" value={consultantName} onChange={e => setConsultantName(e.target.value)} placeholder="Dr. Name" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={treatmentDate} onChange={e => setTreatmentDate(e.target.value)} />
          </div>
        </div>

        {/* Weight Section */}
        <h3 className="section-title">Weight Management</h3>
        <div className="weight-section">
          <div className="form-group">
            <label>Weight Gain</label>
            <input type="number" step="0.1" min="0" value={weightGain} onChange={e => setWeightGain(e.target.value)} placeholder="kg" />
          </div>
          <div className="form-group">
            <label>Dry Weight</label>
            <input type="number" step="0.1" value={dryWeight} onChange={e => setDryWeight(e.target.value)} placeholder="kg" />
          </div>
          <div className="form-group">
            <label>Pre HD Weight</label>
            <input type="number" step="0.1" value={preHdWeight} onChange={e => setPreHdWeight(e.target.value)} placeholder="kg" />
          </div>
          <div className="form-group">
            <label>Post HD Weight</label>
            <input type="number" step="0.1" value={postHdWeight} onChange={e => setPostHdWeight(e.target.value)} placeholder="kg" />
          </div>
          <div className="form-group">
            <label>UF Goal</label>
            <input type="number" step="0.1" value={ufGoal} onChange={e => setUfGoal(e.target.value)} placeholder="Liters" />
          </div>
          <div className="form-group">
            <label>UF Actual</label>
            <input type="number" step="0.1" value={ufActual} onChange={e => setUfActual(e.target.value)} placeholder="Liters" />
          </div>
        </div>

        {/* Dialysis Details */}
        <h3 className="section-title">Dialysis Details</h3>
        <div className="dialysis-section">
          <div className="form-group">
            <label>Number of Dialysis</label>
            <input type="number" value={dialysisCount} onChange={e => setDialysisCount(e.target.value)} placeholder="Count" />
          </div>
          <div className="form-group">
            <label>Dialysis Type</label>
            <select value={dialysisType} onChange={e => setDialysisType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="HD">HD</option>
              <option value="HDF">HDF</option>
              <option value="CRRT">CRRT</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dialysis Use</label>
            <select value={dialysisUse} onChange={e => setDialysisUse(e.target.value)}>
              <option value="">Select Use</option>
              <option value="Single Use">Single Use</option>
              <option value="Reuse">Reuse</option>
            </select>
          </div>
          <div className="form-group">
            <label>Machine Number</label>
            <input type="text" value={machineNumber} onChange={e => setMachineNumber(e.target.value)} placeholder="Machine No." />
          </div>
          <div className="form-group">
            <label>Machine Start</label>
            <input type="time" value={machineStart} onChange={e => setMachineStart(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Machine End</label>
            <input type="time" value={machineEnd} onChange={e => setMachineEnd(e.target.value)} />
          </div>
        </div>

        {/* Access & Heparin */}
        <div className="dialysis-section">
          <div className="form-group">
            <label>Access Type</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" id="jugular" checked={accessTypes.includes("jugular")} onChange={() => handleAccessChange("jugular")} />
                <label htmlFor="jugular">Jugular</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="permCath" checked={accessTypes.includes("permCath")} onChange={() => handleAccessChange("permCath")} />
                <label htmlFor="permCath">Perm Cath</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" id="avf" checked={accessTypes.includes("avf")} onChange={() => handleAccessChange("avf")} />
                <label htmlFor="avf">AVF</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Heparin Bolus</label>
            <input type="number" value={heparinBolus} onChange={e => setHeparinBolus(e.target.value)} placeholder="Units" />
          </div>
          <div className="form-group">
            <label>Heparin Followed by</label>
            <input type="number" value={heparinFollowed} onChange={e => setHeparinFollowed(e.target.value)} placeholder="Units/hr" />
          </div>
        </div>

        {/* Vitals Table */}
        <h3 className="section-title">Vital Signs Monitoring</h3>
        <table className="monitoring-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>BP</th>
              <th>Pulse/Min</th>
              <th>Temperature</th>
              <th>Blood Pump Speed</th>
              <th>VP</th>
              <th>Net UF</th>
              <th>Heparin</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((row, idx) => (
              <tr key={idx}>
                <td><input type="time" value={row.time} onChange={e => handleVitalsChange(idx, "time", e.target.value)} /></td>
                <td><input type="text" value={row.bp} onChange={e => handleVitalsChange(idx, "bp", e.target.value)} placeholder="120/80" /></td>
                <td><input type="number" min="0" value={row.pulse} onChange={e => handleVitalsChange(idx, "pulse", e.target.value)} placeholder="72" /></td>
                <td><input type="number" step="0.1" min="0" value={row.temperature} onChange={e => handleVitalsChange(idx, "temperature", e.target.value)} placeholder="98.6" /></td>
                <td><input type="number" min="0" value={row.bloodPump} onChange={e => handleVitalsChange(idx, "bloodPump", e.target.value)} placeholder="300" /></td>
                <td><input type="number" min="0" value={row.vp} onChange={e => handleVitalsChange(idx, "vp", e.target.value)} placeholder="150" /></td>
                <td><input type="number" step="0.1" min="0" value={row.netUf} onChange={e => handleVitalsChange(idx, "netUf", e.target.value)} placeholder="0.5" /></td>
                <td><input type="number" min="0" value={row.heparin} onChange={e => handleVitalsChange(idx, "heparin", e.target.value)} placeholder="1000" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="add-row-btn" onClick={addVitalsRow}>+ Add Reading</button>

        {/* Pre HD Checklist */}
        <h3 className="section-title">Pre HD Checklist</h3>
        <div className="checkbox-group vertical">
          <div className="checkbox-item">
            <input type="checkbox" id="chartsChecked" checked={chartsChecked} onChange={e => setChartsChecked(e.target.checked)} />
            <label htmlFor="chartsChecked">Checked last three session charts if any complications occurred</label>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" id="injectionsListed" checked={injectionsListed} onChange={e => setInjectionsListed(e.target.checked)} />
            <label htmlFor="injectionsListed">List injections to be given</label>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" id="investigationsListed" checked={investigationsListed} onChange={e => setInvestigationsListed(e.target.checked)} />
            <label htmlFor="investigationsListed">Listed investigations</label>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" id="heparinChecked" checked={heparinChecked} onChange={e => setHeparinChecked(e.target.checked)} />
            <label htmlFor="heparinChecked">Checked type of heparin to be used</label>
          </div>
        </div>

       
        {showSuccess && (
          <div className="success-message" style={{ display: "block" }}>
            Treatment chart saved successfully! ✅
          </div>
        )}

        <button type="submit" className="save-btn">💾 Save Treatment Chart</button>
      </form>
    </div>
  );
}