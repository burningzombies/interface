import React from "react";

export const Story: React.FC = () => {
  return (
    <div className="hash p-3 bg-dark shadow rounded-3">
      <h2 className="text-center mb-4 text-warning fw-bold h4 text-shadow">
        How did everything start?
      </h2>
      <div className="text-light" style={{ lineHeight: "2" }}>
        <p className="text-info">“So what should we do?”</p>
        <p className="text-light">
          “We should just leave her, close the door and walk away.”
        </p>
        <p className="text-info">
          “NO! That’s what got us here in the first place! We have to do the
          right thing.”
        </p>
        <p className="text-light">“Which is?”</p>
        <p className="text-info">“Maybe we can cure her?”</p>
        <p className="text-light">
          “Cure her? Really? Are we looking at the same person? Never mind the
          devastation going on out there, but she can’t be cured. Her arm is
          practically coming off at the shoulder and her guts are still in the
          other room.”
        </p>
        <p className="text-info">
          “Well we can’t just leave her here, maybe we could bring her with us?
          Get away from the city and find someone to help?”
        </p>
        <p className="text-light">“…”</p>
        <p className="text-info">
          “OK, maybe we get her some food, some water and then come check on her
          later on?”
        </p>
        <p className="text-light">
          “We are the food you idiot. Go grab the axe and we can be done with
          her.”
        </p>
        <p className="text-info">“No!”</p>
        <p className="text-light">
          “We have to, the handcuff won’t hold her for long! Either get the axe
          or get the door.”
        </p>
        <p className="text-info">“I can’t, it’s not right. She’s a person.”</p>
        <p className="text-light">
          “A person? Like the ones out there? You didn’t have a problem taking
          the axe to all of them did you? How many of those people did you kill?
          There must have been easily fifty, maybe more.”
        </p>
        <p className="text-info">
          “They weren’t people, they wanted to kill me.”
        </p>
        <p className="text-light">“Just like she does.”</p>
        <p className="text-info">“You’re wrong.”</p>
        <p className="text-light">“Then why is she handcuffed?”</p>
        <p className="text-info">“Because…”</p>
        <p className="text-light">
          “Exactly, now get the axe before she pulls her shoulder apart.”
        </p>
        <p className="text-info">“…”</p>
        <p className="text-light">“Do it”</p>
        <p className="text-info">
          “I shouldn’t listen to you, your bad for me! Get out of my head! GET
          OUT!”
        </p>
        <p className="text-light">
          “I’m the only thing keeping us alive. Now do it! DO IT!”
        </p>
        <p className="text-info">“I.. I’m sorry Love”</p>
      </div>
      <style jsx>{`
        .hash {
          overflow-wrap: break-word;
          overflow-y: scroll;
          scrollbar-color: var(--bs-dark) var(--bs-light);
          height: 35rem;
          color: var(--bs-dark);
        }
      `}</style>
    </div>
  );
};
