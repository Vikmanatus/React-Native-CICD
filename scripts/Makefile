.PHONY: help
.DEFAULT_GOAL := help

help: 							   ## 💡 This is the script generating help
	@IFS=$$'\n' ; \
    help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "%-30s %s\n" ; \
	printf '\033[37m'; \
    printf "%-30s %s"  "🎯 Target" ;\
	printf '\033[37m'; \
	printf "%-30s %s"  "     ℹ️  Help" ;\
    printf "%-30s %s\n" ; \
	printf "%-30s %s\n" ; \
    for help_line in $${help_lines[@]}; do \
        IFS=$$':' ; \
        help_split=($$help_line) ; \
        help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        printf '\033[32m'; \
		printf '\055  '; \
        printf "%-30s %s"  $$help_command ; \
        printf '\033[33m'; \
        printf "%s\n" $$help_info; \
		printf "%s\n"; \
    done

clean-scripts:				## Clears the scripts
	@rm -rf ./build/

generate-scripts:			## Compiles the typescript files into javascript files
	@make clean-scripts && tsc