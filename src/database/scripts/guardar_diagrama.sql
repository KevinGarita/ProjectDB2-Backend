CREATE OR REPLACE FUNCTION public.saveDiagram(diagramURL VARCHAR)
	RETURNS BOOL
	SECURITY DEFINER
	LANGUAGE plpgsql
  AS
$$
DECLARE

BEGIN
	IF(to_regclass('public.diagrams_url') IS NOT NULL) THEN 
		INSERT INTO public.diagrams_url VALUES (diagramURL);
		RETURN 1;	
	END IF;

	
	CREATE TABLE public.diagrams_url (
		url VARCHAR NOT NULL,
		id SERIAL NOT NULL
	);
	INSERT INTO public.diagrams_url VALUES (diagramURL);
	RETURN 1;
END;
$$;