import React from "react";

const KiratiOverview: React.FC = () => (
  
  <section className="py-16 px-6 bg-amber-100 border-t border-amber-100" id="kirati-overview">
    <div className="max-w-3xl mx-auto">
      {/* <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Kirati People: An Overview</h2> */}
      <p className="mb-4 text-lg text-green-800">
        The <strong>Kirati</strong> are an indigenous ethnic group primarily found in the eastern Himalayan region, including eastern Nepal, parts of Sikkim, Darjeeling, and Bhutan. They are known for their rich cultural heritage, unique languages, and close relationship with nature.
      </p>
      <p className="mb-4 text-lg text-green-800">
        The Kirati people mainly include several sub-groups, with the most prominent being:
      </p>
      <ul className="list-disc list-inside mb-4 pl-4 text-green-700">
        <li><strong>Rai</strong></li>
        <li><strong>Limbu</strong></li>
        <li><strong>Yakkha</strong></li>
        <li><strong>Sunuwar</strong></li>
        {/* <li><strong>and many more</strong></li> */}
      </ul>
      <p className="mb-6 text-lg text-green-800">
        Each group has its own dialects, customs, and traditions but shares common cultural roots.
      </p>
      <h3 className="text-2xl font-semibold text-amber-500 mb-3">2. Historical Background</h3>
      <ul className="list-disc list-inside mb-4 pl-4 text-green-700">
        <li>The Kirati people are believed to be among the earliest inhabitants of Nepal and the eastern Himalayan region.</li>
        <li>According to ancient texts and local legends, the Kirati dynasty ruled parts of Nepal for several centuries before the arrival of the Shah dynasty.</li>
        <li>The Kirati era is mentioned in Hindu epics such as the Mahabharata, where Kiratis are described as fierce warriors and skilled archers.</li>
        <li>Historically, they lived in small, autonomous communities in the hills and mountains, practicing subsistence agriculture and hunting.</li>
      </ul>
    </div>
  </section>
  
);

export default KiratiOverview; 